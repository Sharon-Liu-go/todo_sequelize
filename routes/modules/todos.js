const express = require('express')
const router = express.Router()
const db = require('../.././models')
const Todo = db.Todo
const User = db.User

//到create頁面
router.get('/new', (req, res) => {
  res.render('create')
})

//新增todo
router.post('/new', (req, res) => {
  const userId = req.user.id
  const name = req.body.name
  return Todo.create({ name: name, UserId: userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})






router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then((todo) => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router


