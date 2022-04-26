
import { useState } from 'react'

import Workspace from './components/Workspace.js'
import Login from './components/Login'
// import Register from './components/Register'

import trelloService from './trelloService'

export default function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [board, setBoard] = useState(null)

  function logOut () {
    setIsLoggedIn(false)
    setUsername('')
    setBoard(null)
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
