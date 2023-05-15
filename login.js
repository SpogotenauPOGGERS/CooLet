const mainBody = document.querySelector('.main')
const searchedSet = document.querySelector('.searchedSet')

import { setUser, getToken, logOut } from './userManager.js'

export default function renderLogin() {
  searchedSet.value = ''
  searchedSet.disabled = true
  clearElement(mainBody)
  if (getToken() == null) {
    const loginText = document.createElement('h1')
    const loginForm = document.createElement('form')
    const nameInput = document.createElement('input')
    const passwordInput = document.createElement('input')
    const submitButton = document.createElement('button')
    loginText.textContent = 'Login'
    submitButton.textContent = 'Login'
    nameInput.placeholder = 'Username'
    nameInput.required = true
    passwordInput.placeholder = 'Password'
    passwordInput.required = true
    submitButton.type = 'submit'
    loginText.classList.add('loginText')
    loginForm.classList.add('loginForm')
    nameInput.classList.add('nameInput')
    passwordInput.classList.add('passwordInput')
    submitButton.classList.add('submitLogin')
    loginForm.addEventListener('submit', handleLogin)
    mainBody.append(loginText)
    loginForm.append(nameInput)
    loginForm.append(passwordInput)
    loginForm.append(submitButton)
    mainBody.append(loginForm)
    const linkDiv = document.createElement('div')
    linkDiv.classList.add('linkDiv')
    const registerLink = document.createElement('a')
    registerLink.textContent = "Don't have an account yet?"
    registerLink.href = '#register'
    registerLink.classList.add('registerLink')
    linkDiv.append(registerLink)
    mainBody.append(linkDiv)
  } else {
    const logOutText = document.createElement('h1')
    logOutText.textContent = 'You are logged in, do you wanna log out?'
    logOutText.classList.add('logOutText')
    const logOutButton = document.createElement('button')
    logOutButton.textContent = 'Log out'
    logOutButton.classList.add('logOutButton')
    logOutButton.addEventListener('click', (e) => {
      logOut()
      setTimeout(function () {
        location.reload()
      }, 300)
    })
    mainBody.append(logOutText)
    mainBody.append(logOutButton)
  }
}

function handleLogin(e) {
  e.preventDefault()
  const loginData = {
    name: e.target[0].value,
    password: e.target[1].value,
  }
  fetch('http://localhost:9000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.login) {
        setUser(data.accessToken, loginData.name, loginData.password)
        console.log(getToken())
        const rightLinks = document.querySelector('.right-links')
        rightLinks.innerHTML += `<div class="navElement profilePage">
        <a href="#profile"><i class="fa-solid fa-user"></i></a>
      </div>`
        window.location.hash = '#profile'
      } else {
        const loginForm = document.querySelector('.loginForm')
        loginForm.innerHTML += `<p class= "wrongCredentials">Wrong credentials! Please try again </p>`
      }
    })
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
