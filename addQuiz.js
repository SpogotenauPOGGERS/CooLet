const mainBody = document.querySelector('.main')

import { getToken, getUserData } from './userManager.js'

export default function renderAddQuizPage() {
  clearElement(mainBody)
  const addQuizTitle = document.createElement('h1')
  addQuizTitle.textContent = 'Type the name of your new Quiz'
  addQuizTitle.classList.add('addQuizTitle')
  const titleForm = document.createElement('form')
  titleForm.classList.add('titleForm')
  const titleInput = document.createElement('input')
  titleInput.required = true
  titleInput.placeholder = 'Title...'
  titleInput.classList.add('titleInput')
  const titleSubmitButton = document.createElement('button')
  titleSubmitButton.textContent = 'Create this Quiz'
  titleSubmitButton.classList.add('titleSubmitButton')
  titleSubmitButton.type = 'submit'
  titleForm.addEventListener('submit', createTitle)
  titleForm.append(titleInput)
  titleForm.append(titleSubmitButton)
  mainBody.append(addQuizTitle)
  mainBody.append(titleForm)

  const noUserModal = document.createElement('dialog')
  noUserModal.classList.add('noUserModal')
  const noUserText = document.createElement('h1')
  noUserText.classList.add('modalText')
  noUserText.textContent = 'You need to be logged in to create a Quiz'
  const closeModalButton = document.createElement('button')
  closeModalButton.classList.add('closeModalButton')
  closeModalButton.textContent = 'Got it!'
  noUserModal.append(noUserText)
  noUserModal.append(closeModalButton)
  mainBody.append(noUserModal)
  if (getToken() == null) {
    noUserModal.showModal()
  }
  closeModalButton.addEventListener('click', (re) => {
    noUserModal.close()
    window.location.hash = '#login'
  })
  noUserModal.addEventListener('click', (e) => {
    const dialogDimensions = noUserModal.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      noUserModal.close()
      window.location.hash = '#login'
    }
  })
}

function createTitle(e) {
  e.preventDefault()
  const QuizData = {
    setName: e.target[0].value,
    creator: getUserData().username,
  }
  fetch('http://localhost:9000/postQuiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(QuizData),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
