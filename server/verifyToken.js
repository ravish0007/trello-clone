
const jwt = require('jsonwebtoken')

async function verifyToken (req, res, next) {
  const token = req.session.token

  if (!token || !Object.entries(token).length) {
    return res.clearCookie('googleOauth').redirect(process.env.UI_ROOT)
  }

  try {
    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET)
    res.locals.user = verifiedToken.payload
    next()
  } catch (error) {
    console.error(error)
    res.status(400).send('Invalid Token')
  }
}

module.exports = verifyToken
