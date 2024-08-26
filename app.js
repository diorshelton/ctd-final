const express = require('express')
const app = express()


app.get('/', (req, res) => {
  res.send("<h1/>Final Project</h1>")
})


const port = 3000
app.listen(port, () =>  console.log(`App listening on por ${port}`))