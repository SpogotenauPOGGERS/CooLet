import express from 'express'
import { MongoClient } from 'mongodb'
import cors from 'cors'

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

//login and register down here v

app.post('/register', async (req, res) => {
  const { name, password } = req.body
  res.json(await postNewUser(name, password))
})

async function postNewUser(name, password) {
  const result = await client
    .db('CooLet')
    .collection('Users')
    .insertOne({ Username: name, Password: password })
  return result
}
