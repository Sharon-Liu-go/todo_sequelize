const express = require('express')
const router = express.Router()
const db = require('../.././models')
const Todo = db.Todo
const User = db.User


router.get('/', (req, res) => {
  const userId = req.user.id
  return Todo.findAll({
    raw: true,
    nest: true,
    userId
  })
    .then((todos) => {
      // console.log(todos)
      return res.render('index', { todos: todos })
    })
    .catch((error) => { return res.status(422).json(error) })
})





module.exports = router

// const userId = req.user._id
// Todo.find({ userId })
//   .lean()
//   .sort({ _id: 'asc' }) // desc
//   .then(todos => res.render('index', { todos }))
//   .catch(error => console.error(error))