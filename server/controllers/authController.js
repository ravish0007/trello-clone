const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')

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

  // evaluate password
  const match = await bcrypt.compare(password, foundUser[0].password)
  if (match) {
    const [error, result] = await db.fetchBoard(foundUser[0].user_id)

    // create JWT
    // req.session.token = jwt.sign({
    //   userId: foundUser[0].user_id
    // }, process.env.JWT_SECRET, { expiresIn: '1h' })

    const token = jwt.sign({
      userId: foundUser[0].user_id
    }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.send({ boardID: result[0].board_id, token })
  } else {
    res.sendStatus(401)
  }
}

async function handleLogout (req, res) {
  req.session = null
  res.sendStatus(200)
}

module.exports = { handleNewUser, handleLogin, handleLogout }
