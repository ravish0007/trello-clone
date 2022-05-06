
import { useState, useEffect } from 'react'

import Workspace from './components/Workspace.js'
import Login from './components/Login'

import TrelloService from './trelloService.js'
import { removeJwtToken, getJwtToken } from './tokenManager'

export default function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [board, setBoard] = useState(null)

  useEffect(() => {
    if (document.cookie.includes('tokenExists')) {
      setUser(JSON.parse(sessionStorage.getItem('user')))
      setBoard(JSON.parse(sessionStorage.getItem('board')))
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (document.cookie.includes('googleOauth') && !document.cookie.includes('tokenExists')) {
      TrelloService.googleUser().then(data => {
        setUser(data.user)
        setBoard(data.board)
        setIsLoggedIn(true)
      })
    }
  }, [])

  async function logOut () {
    TrelloService.logoutUser().then(() => {
      setIsLoggedIn(false)
      setUser('')
      setBoard(null)
    })
    sessionStorage.removeItem('board')
    sessionStorage.removeItem('user')
  }

  if (!isLoggedIn) {
    return (
      <Login
        setLoginStatus={setIsLoggedIn}
        setBoard={setBoard}
        setUser={setUser}
      />
    )
  }

  sessionStorage.setItem('board', JSON.stringify(board))
  sessionStorage.setItem('user', JSON.stringify(user))

  return (
    <div>
      <Workspace
        user={user}
        board={board}
        onClick={() => setIsLoggedIn(false)}
        logOut={logOut}
      />
    </div>
  )
}
