
import { useState, useEffect } from 'react'

import trelloService from '../trelloService'
import { setJwtToken } from '../tokenManager'

export default function Login ({ setStatus, setBoard, setUser }) {
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
        setUser(username)

        // setting token in session storage
        setJwtToken(result.data.token)
        delete result.data.token

        setBoard(result.data)
        setStatus(true)
      } else {
        setError('Authentication failed')
      }
    } catch (error) {
      setError(error.toString())
    }

    // setBoard(result.data[0])
    // setStatus(true)
  }

  return (
    <section className='grid place-items-center h-screen bg-sky-600'>
      <div className='bg-gray-200 px-6 py-12 h-fit w-4/12 drop-shadow-2xl'>
        <p className='text-center text-red-900'> {error} </p>
        <p className='text-center text-green-500'> {success} </p>
        <h1 className='text-center mb-5 font-black text-lg'>
          {signUp ? 'Register a new account' : 'Welcome back!'}
        </h1>
        <div className='flex justify-center items-center flex-wrap g-6 text-gray-800'>
          <div className='w-6/12'>
            <form onSubmit={handleSubmit}>
              <div className='mb-6'>
                <input
                  type='text'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none'
                  placeholder='Email address'
                />
              </div>

              <div className='mb-6'>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none'
                  placeholder='Password'
                />
              </div>

              <p
                className='cursor-pointer w-fit underline mb-3 text-gray-600 hover:text-sky-900'
                onClick={() => {
                  setError('')
                  setSuccess('')
                  setSignUp(x => !x)
                }}
              >{signUp ? 'Switch to Login' : 'SignUp Instead'}
              </p>

              <button
                type='submit'
                className='inline-block px-7 py-3 bg-sky-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out w-full'
                data-mdb-ripple='true'
                data-mdb-ripple-color='light'
              >
                {signUp ? 'signUp' : 'Login'}
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
