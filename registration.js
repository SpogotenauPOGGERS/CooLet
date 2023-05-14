const mainBody = document.querySelector('.main')

export default function renderRegistrationPage() {
  clearElement(mainBody)
  const loginForm = document.createElement('form')
  const nameInput = document.createElement('input')
  const passwordInput = document.createElement('input')
  const submitButton = document.createElement('button')
  submitButton.textContent = 'Register'
  nameInput.placeholder = 'Username'
  passwordInput.placeholder = 'Password'
  loginForm.classList.add('loginForm')
  nameInput.classList.add('nameInput')
  passwordInput.classList.add('passwordInput')
  submitButton.classList.add('submitLogin')
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
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
