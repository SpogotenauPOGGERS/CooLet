const recoms = document.querySelector('.recommendations')

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
