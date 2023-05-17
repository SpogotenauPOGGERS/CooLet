import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const URL =
  'mongodb+srv://adminCooLet:123@cooletquizzes.cg7qryp.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(URL)

client.connect().then(() => {
  console.log('Connected!')
  app.listen(9000, () => {
    console.log('listening port 9000')
  })
})

app.get('/', async (req, res) => {
  res.json(await getQuizzes())
})

app.get('/getSpec/:set', async (req, res) => {
  const { set } = req.params
  res.json(await getSpecSet(set))
})

app.post('/postQuiz', async (req, res) => {
  const { creator, setName } = req.body
  res.json(await postQuiz(creator, setName))
})

async function getSpecSet(set) {
  const result = await client
    .db('CooLet')
    .collection('Quizzes')
    .find({
      $or: [
        { creator: { $regex: `^${set}`, $options: 'i' } },
        { setName: { $regex: `^${set}`, $options: 'i' } },
      ],
    })
    .toArray()
  return result
}

async function getQuizzes() {
  const result = await client
    .db('CooLet')
    .collection('Quizzes')
    .find({})
    .toArray()
  return result
}

async function postQuiz(creator, setName) {
  const result = await client
    .db('CooLet')
    .collection('Quizzes')
    .insertOne({ creator: creator, setName: setName })
  return result
}

//login and register down here v

app.post('/register', async (req, res) => {
  const { name, password } = req.body
  const existingUser = await findUserByUsername(name)
  if (existingUser.length != 0) {
    return res
      .status(409)
      .json({ error: 'Username already exists', register: false })
  }
  const result = await postNewUser(name, password)
  res.json(result)
})

app.post('/login', async (req, res) => {
  const { name, password } = req.body
  const user = await findUserByName(name)
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }
  if (user.Password !== password) {
    return res.status(403).json({ error: 'Invalid username or password' })
  } else {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({
      message: 'Login successful',
      login: true,
      accessToken: accessToken,
    })
  }
})

app.get('/password', authenticateToken, (req, res) => {
  res.json({ message: 'yeah you are verified!' })
})

app.get('/profile/:user', authenticateToken, async (req, res) => {
  const user = req.params.user
  res.json(await findSetByUsername(user))
})

async function findSetByUsername(name) {
  const result = await client
    .db('CooLet')
    .collection('Quizzes')
    .find({ creator: name })
    .toArray()
  return result
}

async function findUserByName(name) {
  const result = await client
    .db('CooLet')
    .collection('Users')
    .findOne({ Username: name })
  return result
}

async function findUserByUsername(name) {
  const result = await client
    .db('CooLet')
    .collection('Users')
    .find({ Username: name })
    .toArray()
  return result
}

async function postNewUser(name, password) {
  const result = await client
    .db('CooLet')
    .collection('Users')
    .insertOne({ Username: name, Password: password })
  return result
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
