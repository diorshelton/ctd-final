require("dotenv").config();
require("express-async-errors")
require("body-parser")
const express = require("express");
const app = express();

// CONNECT DB
const connectDB = require("./db/connect");


// Routers
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");

// Error handlers
const notFoundMiddleWare = require("./middleware/not-found")
const errorHandlerMiddleWare = require("./middleware/error-handler")

app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postsRouter);

// app.use(notFoundMiddleWare)
// app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 3000;

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
