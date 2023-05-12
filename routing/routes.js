import Router from "./Router.js"
import renderHomePage from "../index.js"

const routes = {
  homePage: { hash: "#home", function: renderHomePage },
  createSet: { hash: "#createSet" },
  login: { hash: "#login" },
  register: { hash: "#register" },
}

const router = new Router(routes)

router.urlResolve()
