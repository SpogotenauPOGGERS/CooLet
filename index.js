const recoms = document.querySelector('.recommendations')
const searchButton = document.querySelector('.searchButton')
const searchedSet = document.querySelector('.searchedSet')
const placeForSearchedSets = document.querySelector('.searchedSets')
const mainBody = document.querySelector('.main')
const homeButton = document.querySelector('.home')
const cardPlace = document.createElement('div')
cardPlace.classList.add('cardPlace')
const questionCard = document.createElement('div')
questionCard.classList.add('questionCard')
const frontSide = document.createElement('div')
frontSide.classList.add('frontSide')
const backSide = document.createElement('div')
backSide.classList.add('backSide')
let i = 0

export default function renderHomePage() {
  clearElement(mainBody)
  homeButton.addEventListener('click', renderHomePage)
  searchedSet.disabled = false
  const welcome = document.createElement('h1')
  welcome.textContent = 'Welcome to CooLet'
  welcome.classList.add('welcome')
  mainBody.append(welcome)
  const placeForSearchedSets = document.createElement('div')
  placeForSearchedSets.classList.add('searchedSets')
  mainBody.append(placeForSearchedSets)
  const recomTitle = document.createElement('h1')
  recomTitle.textContent = 'Here are some recommendations'
  recomTitle.classList.add('recommTitle')
  mainBody.append(recomTitle)
  const recoms = document.createElement('div')
  recoms.classList.add('recommendations')
  mainBody.append(recoms)
  fetch('http://localhost:9000/')
    .then((res) => res.json())
    .then((data) => {
      console.log(data.length)
      let randomNumbers = []

      while (randomNumbers.length < 6) {
        let randomNumber = Math.floor(Math.random() * data.length)

        if (!randomNumbers.includes(randomNumber)) {
          randomNumbers.push(randomNumber)
          const quizzesDiv = document.createElement('div')
          quizzesDiv.innerHTML = `
      <h1>${data[randomNumber].setName}</h1>
      <p>${data[randomNumber].creator}</p>
      `
          quizzesDiv.addEventListener('click', (e) =>
            renderLearnMode(data[randomNumber])
          )

          quizzesDiv.classList.add('quizzes')
          recoms.append(quizzesDiv)
        }
      }
    })

  searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    const searchedSetValue = searchedSet.value
    console.log(searchedSetValue)
    clearElement(placeForSearchedSets)
    fetch(`http://localhost:9000/getSpec/${searchedSetValue}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.length === 0) {
          const nothingFoundText = document.createElement('h2')
          nothingFoundText.textContent = 'There is no set like this'
          nothingFoundText.classList.add('nothingFound')
          placeForSearchedSets.append(nothingFoundText)
        } else {
          data.forEach((quizzes) => {
            const quizzesDiv = document.createElement('div')
            quizzesDiv.innerHTML = `
          <h1>${quizzes.setName}</h1>
          <p>${quizzes.creator}</p>`
            quizzesDiv.addEventListener('click', (e) =>
              renderLearnMode(quizzes)
            )

            quizzesDiv.classList.add('searchedQuizzes')
            placeForSearchedSets.append(quizzesDiv)
          })
        }
      })
  })
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

export function renderLearnMode(quiz) {
  i = 0
  console.log(quiz)
  clearElement(mainBody)

  const prevQuestion = document.createElement('button')
  prevQuestion.classList.add('prevQuestion')
  prevQuestion.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`
  const nextQuestion = document.createElement('button')
  nextQuestion.classList.add('nextQuestion')
  nextQuestion.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`
  const buttonPlace = document.createElement('div')
  buttonPlace.classList.add('buttonPlace')
  buttonPlace.append(prevQuestion, nextQuestion)

  nextQuestion.addEventListener('click', function () {
    showNextQuestion(quiz, frontSide, backSide)
  })

  prevQuestion.addEventListener('click', function () {
    showPrevQuestion(quiz, frontSide, backSide)
  })

  frontSide.textContent = quiz.questions[i].language1
  backSide.textContent = quiz.questions[i].language2

  questionCard.append(frontSide)
  questionCard.append(backSide)
  cardPlace.append(questionCard)
  mainBody.append(cardPlace)
  mainBody.append(buttonPlace)
}

function showNextQuestion(quiz, frontSide, backSide) {
  console.log(i)
  let length = quiz.questions.length - 1

  console.log(length)

  if (i < length) {
    i++
    frontSide.textContent = quiz.questions[i].language1
    backSide.textContent = quiz.questions[i].language2
    return i
  } else {
    console.log('Hallo')
    return i
  }
}

function showPrevQuestion(quiz, frontSide, backSide) {
  console.log(i)
  if (i > 0) {
    i--
    frontSide.textContent = quiz.questions[i].language1
    backSide.textContent = quiz.questions[i].language2
    return i
  } else {
    console.log('Hallo')
    return i
  }
}
