const db = require('../models')

async function fetchAllLists (request, response) {

  if (!request.params.id) {
    response.status(400).json({ error: 'boardID missing' })
  }

  const [error, result] = await db.fetchAllLists(request.params.id)

  for (let i = 0; i < result.length; i++) {
    const [error, cards] = await db.fetchAllCards(result[i].list_id)
    result[i].cards = cards.map(x => { return { ...x, id: x.id.toString() } })
  }

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }

  response.send({ lists: result })
}

async function insertList (request, response) {
  const list = request.body
  if (!list.name) {
    response.status(400).json({ error: 'list name cannot be empty' })
    return
  }

  const [error, result] = await db.insertList(list)
  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }
  response.send(result)
}

async function updateList (request, response) {
  const list = request.body

  if (!list.name) {
    response.status(400).json({ error: 'list name cannot be empty' })
    return
  }

  const [error, result] = await db.updateList({ ...list, id: request.params.id })

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }
  response.status(201).end()
}

async function deleteList (request, response) {
  if (!request.params.id) {
    response.status(400).json({ error: 'id missing in params' })
    return
  }

  const [error, result] = await db.deleteList(request.params.id)

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }

  response.status(201).end()
}

async function getCards (request, response) {
  if (!request.params.listID) {
    response.status(400).json({ error: 'listID is absent in params' })
    return
  }

  const [error, result] = await db.fetchAllCards(request.params.listID)

  console.log(result)

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }
  response.send(result)
}

async function insertCard (request, response) {
  const card = request.body

  if (!card.listID) {
    response.status(400).json({ error: 'list id cannot be empty' })
    return
  }

  const [error, result] = await db.insertCard(card)
  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }
  response.send(result)
}

async function updateCard (request, response) {
  const card = request.body

  if (!request.params.id) {
    response.status(400).json({ error: 'cardID cannot be empty' })
    return
  }

  const [error, result] = await db.updateCard({ ...card, id: request.params.id })

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }
  response.status(201).end()
}

async function deleteCard (request, response) {
  if (!request.params.id) {
    response.status(400).json({ error: 'cardId missing' })
    return
  }

  const [error, result] = await db.deleteCard(request.params.id)

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }

  response.status(201).end()
}

async function moveCard (request, response) {
  const payload = request.body

  // !payload.fromIndex < 0 || !payload.destinationIndex < 0)
  if (!payload.listFromID || !payload.listDestinationID) {
    response.status(400).json({ error: 'listFromID, listDestinationID, cardSourceID , destinationIndex missing' })
    return
  }

  const [error, result] = await db.moveCard(payload)

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }

  response.status(201).end()
}

module.exports = {
  fetchAllLists,
  insertList,
  updateList,
  deleteList,
  getCards,
  insertCard,
  updateCard,
  deleteCard,
  moveCard
}
