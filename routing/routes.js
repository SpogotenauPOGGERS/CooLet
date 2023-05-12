import Router from './Router.js'
import renderHomePage from '../index.js'
import renderLogin from '../login.js'

const routes = {
  homePage: { hash: '#home', function: renderHomePage },
  createSet: { hash: '#createSet' },
  login: { hash: '#login', function: renderLogin },
  register: { hash: '#register' },
}

const router = new Router(routes)

router.urlResolve()
