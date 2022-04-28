export function getJwtToken () {
  return sessionStorage.getItem('jwt')
}

export function setJwtToken (token) {
  sessionStorage.setItem('jwt', token)
}

export function removeJwtToken () {
  sessionStorage.removeItem('jwt')
}
