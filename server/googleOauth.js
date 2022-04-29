const axios = require('axios')
const querystring = require('querystring')

const redirectURI = 'api/auth/google'

function googleAuthServerURL () {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const options = {
    redirect_uri: `${process.env.SERVER_ROOT_URI}/${redirectURI}`,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  }

  return `${rootUrl}?${querystring.stringify(options)}`
}

async function getUser (code) {
  const url = 'https://oauth2.googleapis.com/token'
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${process.env.SERVER_ROOT_URI}/${redirectURI}`,
    grant_type: 'authorization_code'
  }

  try {
    const result = await axios
      .post(url, querystring.stringify(values), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

    const { id_token, access_token } = result.data

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
      .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      { headers: { Authorization: `Bearer ${id_token}` } })

    return googleUser.data
  } catch (error) {
    console.error(error)
  }
}
module.exports = { googleAuthServerURL, getUser }
