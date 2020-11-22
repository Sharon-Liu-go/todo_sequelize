const express = require('express')
const router = express.Router()
const db = require('../.././models')
const Todo = db.Todo
const User = db.User


router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

//到create頁面

//新增todo
router.put('/new', (req, res) => {
  return Todo.create(req.body)
    .then(todo => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  res.send(`happy world!`)
})


router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then((todo) => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router


