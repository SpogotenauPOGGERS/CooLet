const mainBody = document.querySelector('.main')
const searchedSet = document.querySelector('.searchedSet')
let errorSign = false

import { getToken } from './userManager.js'

export default function renderRegistrationPage() {
  searchedSet.value = ''
  searchedSet.disabled = true
  if (getToken() == null) {
    clearElement(mainBody)
    const registrationText = document.createElement('h1')
    const loginForm = document.createElement('form')
    const nameInput = document.createElement('input')
    const passwordInput = document.createElement('input')
    const submitButton = document.createElement('button')
    submitButton.type = 'submit'
    loginForm.addEventListener('submit', handleRegister)
    registrationText.textContent = 'Registration'
    registrationText.classList.add('registrationText')
    submitButton.textContent = 'Register'
    nameInput.placeholder = 'Username'
    passwordInput.placeholder = 'Password'
    loginForm.classList.add('loginForm')
    nameInput.classList.add('nameInput')
    passwordInput.classList.add('passwordInput')
    submitButton.classList.add('submitLogin')
    mainBody.append(registrationText)
    loginForm.append(nameInput)
    loginForm.append(passwordInput)
    loginForm.append(submitButton)
    mainBody.append(loginForm)
  } else {
    window.location.hash = '#home'
  }
}

function handleRegister(e) {
  e.preventDefault()
  const registerData = {
    name: e.target[0].value,
    password: e.target[1].value,
  }
  fetch('http://localhost:9000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.acknowledged) {
        window.location.hash = '#login'
      } else {
        const loginForm = document.querySelector('.loginForm')
        if (!errorSign) {
          loginForm.innerHTML += `<p class= "wrongCredentials">There is already a user with this name</p>`
          errorSign = true
        }
      }
    })
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
