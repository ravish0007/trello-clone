const Pool = require('pg').Pool

const config = require('../config')

const pool = new Pool(config.db)

async function insertUser (user) {
  try {
    const result = await pool.query('INSERT INTO users (username, password) values ($1, $2) RETURNING user_id', [user.name, user.passwordHash])

    const newBoard = await pool.query('INSERT INTO boards (user_id, board_name, status) values ($1, $2, 1) RETURNING board_id', [result.rows[0].user_id, 'temp'])

    return [null, [{ user_id: result.rows[0].user_id, board_id: newBoard.rows[0].board_id }]]
  } catch (error) {
    return [error, null]
  }
}

async function getPassword (username) {
  try {
    const user = await pool.query('SELECT * FROM users where username = $1', [username])
    return [null, user.rows]
  } catch (error) {
    return [error, null]
  }
}

async function fetchBoard (userID) {
  try {
    const result = await pool.query('SELECT board_id FROM boards WHERE user_id = $1', [userID])
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function fetchAllLists (boardID) {
  try {
    const result = await pool.query('SELECT list_id, name FROM lists where board_id=$1 and status=1', [boardID])
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function insertList (list) {
  try {
    const query = `INSERT into lists
                   (board_id, name, status) values
                   ($1, $2, 1) RETURNING list_id`

    const values = [list.boardID, list.name]

    const result = await pool.query(query, values)
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function updateList (list) {
  try {
    const query = `UPDATE lists SET
                   name = $1 where list_id = $2`

    const values = [list.name, list.id]

    const result = await pool.query(query, values)
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function deleteList (listID) {
  try {
    const query = `UPDATE lists SET
                   status = 0 WHERE 
                   list_id = $1`

    const values = [listID]

    const result = await pool.query(query, values)
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function fetchAllCards (listID) {
  try {
    const result = await pool.query('SELECT card_id as id, name, description, position FROM cards where list_id=$1 and status=1', [listID])
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function fetchCard (cardID) {
  try {
    const result = await pool.query('SELECT * FROM cards where card_id=$1', [cardID])
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function insertCard (card) {
  try {
    const insertQuery = `INSERT into cards
                   (list_id, name, status) values
                   ($1, $2, 1) RETURNING card_id`

    const assignPositionQuery = 'UPDATE cards set position = (SELECT counter from lists where list_id = $1) where card_id = $2'

    const reflectCounterQuery = 'UPDATE lists set counter = counter + 1 where list_id = $1'

    const cardResult = await pool.query(insertQuery, [card.listID, card.name])
    let result = await pool.query(assignPositionQuery, [card.listID, cardResult.rows[0].card_id])
    result = await pool.query(reflectCounterQuery, [card.listID])

    return [null, cardResult.rows]
  } catch (error) {
    return [error, null]
  }
}

async function updateCard (card) {
  try {
    let query = `UPDATE cards SET
                   name = $1, description = $2 where card_id = $3`

    let values = [card.name, card.description, card.id]

    if (!card.name) {
      query = `UPDATE cards SET
                   description = $1 where card_id = $2`
      values = [card.description, card.id]
    }

    const result = await pool.query(query, values)
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function deleteCard (cardID) {
  try {
    const positionQuery = 'SELECT list_id, position from cards where card_id = $1'

    const query = `UPDATE cards SET
                   status = 0, position = -1 WHERE 
                   card_id = $1`

    const decrementPosition = `UPDATE cards SET
                   position = position - 1 WHERE 
                   list_id = $1 and position > $2`

    const updateCounter = `UPDATE lists SET
                   counter = counter - 1 WHERE 
                   list_id = $1`

    const cardResult = await pool.query(positionQuery, [cardID])
    let result = await pool.query(query, [cardID])
    result = await pool.query(decrementPosition, [cardResult.rows[0].list_id, cardResult.rows[0].position])
    result = await pool.query(updateCounter, [cardResult.rows[0].list_id])
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function moveCard (payload) {
  try {
  // remove card
    await deleteCard(payload.cardFromID)
    const [error, result] = await fetchCard(payload.cardFromID)

    // insertion, replication

    // a) update counter to +1 in list
    await pool.query('UPDATE lists SET counter = counter + 1 WHERE list_id = $1', [payload.listDestinationID])

    // b) increment all below items from destinationIndex in destinationList
    await pool.query('UPDATE cards SET position = position + 1 WHERE list_id = $1 and status = 1', [payload.listDestinationID])

    // c) insert card into that list by updating its list_id and position and making it active
    await pool.query('UPDATE cards SET list_id = $2, position = $3, status = 1 WHERE card_id = $1', [payload.cardFromID, payload.listDestinationID, payload.destinationIndex])

    return [null, true]
  } catch (error) {
    return [error, false]
  }
}

module.exports = {
  insertUser,
  getPassword,
  fetchBoard,
  fetchAllLists,
  insertList,
  updateList,
  deleteList,
  fetchAllCards,
  insertCard,
  updateCard,
  deleteCard,
  moveCard
}
