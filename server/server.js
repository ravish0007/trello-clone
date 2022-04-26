const express = require('express')
const cors = require('cors')

const router = require('./routes')
const config = require('./config')

const app = express()

app.use(cors())
app.use(express.json())
// app.use(express.static('public'))

app.use('/api/lists', router.trelloListRoute)
app.use('/api/cards', router.trelloCardRoute)
app.use('/api/users', router.userRoute)

const PORT = process.env.SERVER_PORT || 3001
app.listen(PORT, () => { console.log(`Server running.. on ${PORT}`) })

// const todoModel = require('./models')
// console.log(todoModel.fetchAllLists().then(x => console.log(x)))
// todoModel.insertList({ boardID: 2, name: 'again' }).then((x) => console.log(x))
// todoModel.updateList({ id: 4, name: 'hello again' }).then((x) => console.log(x))
// todoModel.deleteList(4).then((x) => console.log(x))

// console.log(todoModel.fetchAllCards(4).then(x => console.log(x)))
// todoModel.insertCard({ listID: 4, name: 'ad' }).then((x) => console.log(x))
// todoModel.insertCard({ listID: 4, name: 'sadsds stuff' }).then((x) => console.log(x))
// todoModel.updateCard({ id: 17, name: 'hello again' }).then((x) => console.log(x))
// todoModel.deleteCard(1).then((x) => console.log(x))

// const bcrypt = require('bcrypt')
// bcrypt.hash('hello', 10).then((hash, error) => todoModel.insertUser({ name: 'nfs@gmail.com', passwordHash: hash }).then((x) => console.log(x)))

// todoModel.getPassword('ravish.nfs@gmail.com').then(x => {
//   console.log(x)
//   bcrypt.compare('helloo', x[1][0].password).then(x => console.log(x))
// })

// const match = await bcrypt.compare(pwd, foundUser.password);
//     if (match) {
//         // create JWTs
//         res.json({ 'success': `User ${user} is logged in!` });
//     } else {
//         res.sendStatus(401);
//     }
