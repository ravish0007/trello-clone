const Pool = require('pg').Pool

const config = require('../config')

const pool = new Pool(config.db)

async function insertUser (user) {
  try {
    const result = await pool.query('INSERT INTO users (username, password) values ($1, $2)', [user.name, user.passwordHash])
    return [null, result.rows]
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
