const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
const flash = require('connect-flash')


const app = express()
const PORT = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())  // 掛載套件
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  res.locals.error = req.flash('error')
  next()
})

app.use(routes)









app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

