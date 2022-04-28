
import { useState, useEffect } from 'react'

import Workspace from './components/Workspace.js'
import Login from './components/Login'

import { removeJwtToken, getJwtToken } from './tokenManager'

export default function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [board, setBoard] = useState(null)

  useEffect(() => {
    if (getJwtToken()) {
      setBoard(JSON.parse(sessionStorage.getItem('board')))
      setUsername(JSON.parse(sessionStorage.getItem('username')))
      setIsLoggedIn(true)
    }
  }, [])

  async function logOut () {
    removeJwtToken()

    setIsLoggedIn(false)
    setUsername('')
    setBoard(null)

    sessionStorage.removeItem('board')
    sessionStorage.removeItem('username')
  }

  if (!isLoggedIn) {
    return (
      <Login
        setStatus={setIsLoggedIn}
        setBoard={setBoard}
        setUser={setUsername}
      />
    )
  }

  sessionStorage.setItem('board', JSON.stringify(board))
  sessionStorage.setItem('username', JSON.stringify(username))

  return (
    <div>
      <Workspace
        username={username}
        board={board}
        onClick={() => setIsLoggedIn(false)}
        logOut={logOut}
      />
    </div>
  )
}
