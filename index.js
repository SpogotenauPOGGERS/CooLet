const searchButton = document.querySelector('.searchButton')
const searchedSet = document.querySelector('.searchedSet')
const mainBody = document.querySelector('.main')

export default function renderHomePage() {
  clearElement(mainBody)
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
          <p>${quizzes.creator}</p>
          `

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
const recoms = document.querySelector(".recommendations")
const searchButton = document.querySelector(".searchButton")
const searchedSet = document.querySelector(".searchedSet")
const placeForSearchedSets = document.querySelector(".searchedSets")
const mainBody = document.querySelector(".main")

export default function renderHomePage() {
  fetch("http://localhost:9000/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.length)
      let randomNumbers = []

      while (randomNumbers.length < 6) {
        let randomNumber = Math.floor(Math.random() * data.length)

        if (!randomNumbers.includes(randomNumber)) {
          randomNumbers.push(randomNumber)
          const quizzesDiv = document.createElement("div")
          quizzesDiv.innerHTML = `
      <h1>${data[randomNumber].setName}</h1>
      <p>${data[randomNumber].creator}</p>
      `
          quizzesDiv.addEventListener("click", (e) =>
            renderLearnMode(data[randomNumber])
          )

          quizzesDiv.classList.add("quizzes")
          recoms.append(quizzesDiv)
        }
      }
    })

  searchButton.addEventListener("click", (e) => {
    e.preventDefault()
    const searchedSetValue = searchedSet.value
    console.log(searchedSetValue)
    clearElement(placeForSearchedSets)
    fetch(`http://localhost:9000/getSpec/${searchedSetValue}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.length === 0) {
          const nothingFoundText = document.createElement("h2")
          nothingFoundText.textContent = "There is no set like this"
          nothingFoundText.classList.add("nothingFound")
          placeForSearchedSets.append(nothingFoundText)
        } else {
          data.forEach((quizzes) => {
            const quizzesDiv = document.createElement("div")
            quizzesDiv.innerHTML = `
          <h1>${quizzes.setName}</h1>
          <p>${quizzes.creator}</p>`
            quizzesDiv.addEventListener("click", (e) =>
              renderLearnMode(quizzes)
            )

            quizzesDiv.classList.add("searchedQuizzes")
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

function renderLearnMode(quiz) {
  console.log(quiz)
  clearElement(mainBody)

  console.log(quiz.questions[3].language)

  
}

