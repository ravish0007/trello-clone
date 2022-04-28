const express = require('express')
const cors = require('cors')

const morgan = require('morgan')

const router = require('./routes')

const cookieSession = require('cookie-session')

const verifyToken = require('./verifyToken')

const app = express()

app.use(morgan('combined'))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

// app.use(cors(
//   {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
// ))

// app.use(function (req, res, next) {
//   res.header('Content-Type', 'application/json;charset=UTF-8')
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
//   next()
// })

app.use(express.json())
// app.use(express.static('public'))
app.use(cookieSession({ secret: process.env.SESSION_SECRET, httpOnly: true }))

app.use('/api/lists', verifyToken, router.trelloListRoute)
app.use('/api/cards', verifyToken, router.trelloCardRoute)
app.use('/api/auth', router.authRoute)

const PORT = process.env.SERVER_PORT || 3001

// const https = require('https')
// const fs = require('fs')
// https
//   .createServer(
//     {
//       key: fs.readFileSync('server.key'),
//       cert: fs.readFileSync('server.cert')
//     },
//     app
//   )
//   .listen(PORT, function () {
//     console.log(
//       'Example app listening on port 3000! Go to https://localhost:3000/'
//     )
//   })

app.listen(PORT, () => { console.log(`Server running.. on ${PORT}`) })
