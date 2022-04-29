
import { useState, useEffect } from 'react'

import trelloService from '../trelloService'

export default function Login ({ setLoginStatus, setBoard, setUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [signUp, setSignUp] = useState(false)

  const [error, setError] = useState('some')
  const [success, setSuccess] = useState('some')

  useEffect(() => { setSuccess(''); setError('') }, [username, password])

  async function handleSubmit (e) {
    e.preventDefault()

    if (signUp) {
      try {
        const result = await trelloService.registerUser({ username, password })
        setSuccess('Registered!')
        setSignUp(false)
        return
      } catch (error) {
        setError(error.toString())
        return
      }
    }

    try {
      const result = await trelloService.verifyUser({ username, password })
      if (result) {
        setUser(result.user)
        setBoard(result.board)
        setLoginStatus(true)
      } else {
        setError('Authentication failed')
      }
    } catch (error) {
      setError(error.toString())
    }
  }

  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto mt-20 sm:px-6 lg:px-8'>
      <div className='max-w-lg mx-auto'>
        <p className='text-6xl italic font-bold text-center text-sky-600 '>Trello</p>

        <p className='max-w-md mx-auto mt-4 text-center text-gray-500'>Boost your productivity from today!</p>

        <form className='p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl' onSubmit={handleSubmit}>

          <p className='text-center text-red-900'> {error} </p>
          <p className='text-center text-green-500'> {success} </p>
          <p className='text-lg font-medium'>
            {signUp ? 'Register a new account' : 'Sign in to your account'}
          </p>

          <div>
            <label htmlFor='email' className='text-sm font-medium'>Email</label>

            <div className='relative mt-1'>
              <input
                type='email'
                id='email'
                className='w-full p-4 pr-12 text-sm border border-solid border-gray-200 rounded shadow-sm focus:border-sky-600 focus:outline-none'
                placeholder='Enter email'
                autoComplete='off'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

            </div>
          </div>

          <div>
            <label htmlFor='password' className='text-sm font-medium'>Password</label>

            <div className='relative mt-1'>
              <input
                type='password'
                id='password'
                className='w-full p-4 pr-12 text-sm border border-solid border-gray-200 rounded shadow-sm outline-none focus:border-sky-600'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>
          </div>

          <button type='submit' className='block w-full px-5 py-3 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded'>
            {signUp ? 'Register' : 'Sign in'}
          </button>

          <p className='text-sm text-center text-gray-500'>
            {signUp ? 'Already have account?' : 'No account?'}
            <a
              className='underline px-2' href=''
              onClick={(e) => {
                e.preventDefault()
                setError('')
                setSuccess('')
                setSignUp(x => !x)
              }}
            >
              {signUp ? 'Login' : 'SignUp'}

            </a>

          </p>

          <button
            className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded border-gray-300 flex items-center w-full mt-10 hover:bg-blue-50 hover:border-blue-200 focus:outline-none'
            onClick={(e) => {
              e.preventDefault()
              trelloService.googleLogin().then(x => {
                window.open(x.redirectURL, '_self')
              })
            }}
          >
            <p className='w-full text-base font-medium ml-4 text-gray-700 text-center'>
              <img src='https://hrcdn.net/community-frontend/assets/google-colored-20b8216731.svg' className='inline w-6 h-6 mr-4' alt='google' />
              Sign in with Google
            </p>
          </button>
        </form>

      </div>
    </div>
  )
}
