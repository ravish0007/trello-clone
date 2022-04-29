const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = require('../models')

const googleOauth = require('../googleOauth')

async function handleNewUser (req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' })
  }

  // check for duplicate username in the db
  const [error, duplicate] = await db.getPassword(username)

  if (duplicate.length) {
    return res.sendStatus(409) // Conflict
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = { name: username, passwordHash }
    await db.insertUser(newUser)
    res.status(201).json({ success: `New user ${username} created!` })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function handleLogin (req, res) {
  const { username, password } = req.body

  if (!username || !password) return res.status(400).json({ message: 'Username and password are required.' })

  const [error, foundUser] = await db.getPassword(username)

  if (!foundUser.length) return res.sendStatus(401) // Unauthorized

  const user = foundUser[0]

  // evaluate password
  const match = await bcrypt.compare(password, user.password)
  if (match) {
    const [error, result] = await db.fetchBoard(user.user_id)

    // create JWT
    req.session.token = jwt.sign({
      userID: user.user_id
    }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.send({
      board: { boardID: result[0].board_id },
      user: {
        email: user.username,
        picture: null,
        name: user.username.split('@')[0]
      }
    })
  } else {
    res.sendStatus(401)
  }
}

async function handleLogout (req, res) {
  req.session = null
  res.clearCookie('googleOauth').send(process.env.UI_ROOT)
}

async function GoogleOauthRedirect (req, res) {
  res.send({ redirectURL: googleOauth.googleAuthServerURL() })
}

async function GoogleOauthCallback (req, res) {
  const code = req.query.code

  const user = await googleOauth.getUser(code)

  // {"id":"116204350791824442338",
  // "email":"ravish.nfs@gmail.com",
  // "verified_email":true,
  // "name":"ravish shankar",
  // "given_name":"ravish",
  // "family_name":"shankar",
  // "picture":"https://lh3.googleusercontent.com/a-/AOh14Gjflq8zL3zNojorew4IVXZNo6WIkPxOwbhkIeVB=s96-c",
  // "locale":"en"}

  // check for duplicate username in the db
  const [error, duplicate] = await db.getPassword(user.email)

  let payload

  if (duplicate.length) {
    const foundUser = duplicate[0]

    const [error1, board] = await db.fetchBoard(foundUser.user_id)

    payload = {
      board: { boardID: board[0].board_id },
      user: {
        email: user.email,
        picture: user.picture,
        name: user.name
      }
    }
  } else {
    const [error2, newUser] = await db.insertUser({ name: user.email, passwordHash: '*' })
    payload = {
      board: { boardID: newUser[0].board_id },
      user: {
        email: user.email,
        picture: user.picture,
        name: user.name
      }
    }
  }

  req.session.token = jwt.sign({
    payload
  }, process.env.JWT_SECRET, { expiresIn: '1h' })

  res.cookie('googleOauth', 'true', {
    expires: new Date(new Date().getTime() + 100 * 1000),
    httpOnly: false
  }).redirect(process.env.UI_ROOT)
}

async function GoogleUserProvider (req, res) {
  res.send(res.locals.user)
}

module.exports = {
  handleNewUser,
  handleLogin,
  handleLogout,
  GoogleOauthRedirect,
  GoogleOauthCallback,
  GoogleUserProvider
}
