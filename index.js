const recoms = document.querySelector('.recommendations')
const searchButton = document.querySelector('.searchButton')
const searchedSet = document.querySelector('.searchedSet')
const placeForSearchedSets = document.querySelector('.searchedSets')

fetch('http://localhost:9000/')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((quizzes) => {
      const quizzesDiv = document.createElement('div')
      quizzesDiv.innerHTML = `
        <h1>${quizzes.setName}</h1>
        <p>${quizzes.creator}</p>
        `

      quizzesDiv.classList.add('quizzes')
      recoms.append(quizzesDiv)
    })
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

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
