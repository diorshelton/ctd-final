require("dotenv").config()
const express = require('express')
const app = express()

// CONNECT DB
const connectDB = require("./db/connect")
// Posts Router
const postsRouter = require('./routes/posts')

// middleware
const notFound = require('./middleware/not-found')


// routes 
app.use("/api/v1/posts", postsRouter)

app.use(notFound)

const port =  process.env.PORT || 3000 

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();