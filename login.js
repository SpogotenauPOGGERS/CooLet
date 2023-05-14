const mainBody = document.querySelector('.main')

import { setUser, getToken, logOut } from './userManager.js'

export default function renderLogin() {
  clearElement(mainBody)
  if (getToken() == null) {
    const loginForm = document.createElement('form')
    const nameInput = document.createElement('input')
    const passwordInput = document.createElement('input')
    const submitButton = document.createElement('button')
    submitButton.textContent = 'Login'
    nameInput.placeholder = 'Username'
    nameInput.required = true
    passwordInput.placeholder = 'Password'
    passwordInput.required = true
    submitButton.type = 'submit'
    loginForm.classList.add('loginForm')
    nameInput.classList.add('nameInput')
    passwordInput.classList.add('passwordInput')
    submitButton.classList.add('submitLogin')
    loginForm.addEventListener('submit', handleLogin)
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
