const mainBody = document.querySelector('.main')

import { getToken, getUserData } from './userManager.js'

export default function renderAddQuizPage() {
  clearElement(mainBody)
  let quizQuestions = []
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
  titleForm.addEventListener('submit', (e) => createTitle(e, quizQuestions))

  const questionsTitle = document.createElement('h1')
  questionsTitle.classList.add('questionsTitle')
  questionsTitle.textContent = 'Here you can add your terms'

  const language1Input = document.createElement('input')
  language1Input.classList.add('languageInput')
  language1Input.placeholder = 'Write your Term in here'
  const language2Input = document.createElement('input')
  language2Input.classList.add('languageInput')
  language2Input.placeholder = 'And here the translation'
  const languages = document.createElement('div')
  languages.classList.add('languageInputs')
  languages.append(language1Input)
  languages.append(language2Input)
  const addAnotherTermButton = document.createElement('button')
  addAnotherTermButton.classList.add('addAnotherTermButton')
  addAnotherTermButton.innerHTML = `<i class="fa-solid fa-plus"></i>`

  titleForm.append(titleInput)
  titleForm.append(questionsTitle)
  titleForm.append(languages)
  titleForm.append(titleSubmitButton)
  titleForm.append(addAnotherTermButton)
  mainBody.append(addQuizTitle)
  mainBody.append(titleForm)

  addAnotherTermButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (
      language1Input.value.length === 0 ||
      language1Input.value == '' ||
      language2Input.value.length === 0 ||
      language2Input.value == ''
    ) {
      language1Input.value = ''
      language2Input.value = ''
    } else {
      let question = {
        language1: language1Input.value,
        language2: language2Input.value,
      }
      const termAndTranslation = document.createElement('div')
      termAndTranslation.classList.add('termAndTranslation')
      const language1 = document.createElement('div')
      language1.classList.add('language')
      language1.textContent = language1Input.value
      const language2 = document.createElement('div')
      language2.classList.add('language')
      language2.textContent = language2Input.value
      termAndTranslation.append(language1)
      termAndTranslation.append(language2)
      mainBody.append(termAndTranslation)
      quizQuestions.push(question)
      language1Input.value = ''
      language2Input.value = ''
    }
  })

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
  closeModalButton.addEventListener('click', (e) => {
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

function createTitle(e, quizQuestions) {
  e.preventDefault()
  const QuizData = {
    setName: e.target[0].value,
    creator: getUserData().username,
    questions: quizQuestions,
  }
  fetch('http://localhost:9000/postQuiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(QuizData),
  })
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        window.location.hash = '#profile'
      }, 1000)
    })
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
