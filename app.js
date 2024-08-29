const express = require('express')
const app = express()

// routers
const postsRouter = require('./routes/posts')

// middleware
const notFound = require('./middleware/not-found')

// app.get('/api/v1', (req, res) => {
//   res.send("<h1/>Final Project</h1>")
// })

// app.get('/api/v1/:id', (req, res) => {
//   console.log(req.params)
//   res.send(`${req.params.id}`)
// })

// routes 
app.use("/api/v1/posts", postsRouter)

app.use(notFound)

const port =  process.env.PORT || 3000 

app.listen(port, () =>  console.log(`listening on port ${port}`))