const user = { token: null, username: null, password: null }

export function setUser(token, username, password) {
  user.token = token
  user.username = username
  user.password = password
}

export function getToken() {
  return user.token
}

export function getUserData() {
  return user
}

export function logOut() {
  user.token = null
  console.log(user.token)
}
