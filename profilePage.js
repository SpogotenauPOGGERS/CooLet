const mainBody = document.querySelector('.main')
const searchedSet = document.querySelector('.searchedSet')

import { getUserData, getToken } from './userManager.js'

export default function renderProfilePage() {
  searchedSet.value = ''
  searchedSet.disabled = true
  if (getToken() == null) {
    window.location.hash = '#home'
  }
  clearElement(mainBody)
  const username = getUserData().username
  const headSpace = document.createElement('div')
  const profileTitle = document.createElement('h1')
  profileTitle.textContent = `Your profile`
  const usernameTag = document.createElement('h1')
  const createSetButton = document.createElement('button')
  createSetButton.textContent = 'Create a new set'
  createSetButton.addEventListener('click', (e) => {
    window.location.hash = '#createQuiz'
  })
  createSetButton.classList.add('createSetButton')
  usernameTag.textContent = username
  profileTitle.append(usernameTag)
  headSpace.classList.add('headSpace')
  usernameTag.classList.add('usernameTag')
  profileTitle.classList.add('profileTitle')
  headSpace.append(profileTitle)
  headSpace.append(createSetButton)
  console.log(username)
  const setSpace = document.createElement('div')
  setSpace.classList.add('setSpace')
  profileTitle.append(usernameTag)
  mainBody.append(headSpace)
  mainBody.append(setSpace)
  fetch(`http://localhost:9000/profile/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.length == 0) {
        const noSets = document.createElement('div')
        noSets.textContent = "You don't have any Quizzes yet"
        noSets.classList.add('noSets')
        mainBody.append(noSets)
      }
      console.log(data.length)
      data.forEach((quiz) => {
        const quizzesDiv = document.createElement('div')
        quizzesDiv.innerHTML = `
      <h1>${quiz.setName}</h1>
      `
        quizzesDiv.addEventListener('click', (e) => renderLearnMode(quiz))

        quizzesDiv.classList.add('quizzes')
        setSpace.append(quizzesDiv)
      })
    })
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
