const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: '.handlebar' }))
app.set('view engine', 'handlebar')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})






app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})

