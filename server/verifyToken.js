
const jwt = require('jsonwebtoken')

async function verifyToken (req, res, next) {
  const token = req.headers?.authorization.split(' ')[1]

  if (!token || !Object.entries(token).length) {
    return res.status(401).send('Access denied')
  }

  try {
    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET)
    res.locals.user = verifiedToken
    next()
  } catch (error) {
    console.error(error)
    res.status(400).send('Invalid Token')
  }
}

module.exports = verifyToken
