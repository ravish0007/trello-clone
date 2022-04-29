const express = require('express')
const cors = require('cors')

// const morgan = require('morgan')

const router = require('./routes')

const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')

const verifyToken = require('./verifyToken')

const app = express()

// app.use(morgan('combined'))

app.use(cors({ origin: process.env.UI_ROOT, credentials: true }))

app.use(cookieSession({ secret: process.env.SESSION_SECRET, httpOnly: true, sameSite: 'strict' }))
app.use(cookieParser())

app.use(express.json())
app.use(express.static('public'))

app.use('/api/lists', verifyToken, router.trelloListRoute)
app.use('/api/cards', verifyToken, router.trelloCardRoute)
app.use('/api/auth', router.authRoute)

const PORT = process.env.SERVER_PORT || 3001

app.listen(PORT, () => { console.log(`Server running.. on ${PORT}`) })
