const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../.././models')
const Todo = db.Todo
const User = db.User
// 引用 passport，放在文件上方
const passport = require('passport')
// 加入 middleware，驗證 reqest 登入狀態


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      console.log('User already exists')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  // req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})


module.exports = router


