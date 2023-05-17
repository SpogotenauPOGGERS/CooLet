import Router from './Router.js'
import renderHomePage from '../index.js'
import renderLogin from '../login.js'
import renderRegistrationPage from '../registration.js'
import renderProfilePage from '../profilePage.js'
import renderAddQuizPage from '../addQuiz.js'

const routes = {
  homePage: { hash: '#home', function: renderHomePage },
  createSet: { hash: '#createSet' },
  login: { hash: '#login', function: renderLogin },
  register: { hash: '#register', function: renderRegistrationPage },
  profile: { hash: '#profile', function: renderProfilePage },
  addQuiz: { hash: '#createQuiz', function: renderAddQuizPage },
}

const router = new Router(routes)

router.urlResolve()
