require("dotenv").config();
require("express-async-errors")
const express = require("express");
const app = express();

// Connect DB
const connectDB = require("./db/connect");

const authenticateUser = require("./middleware/authentication")

// Routers
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");

// Error handlers
const notFoundMiddleWare = require("./middleware/not-found")
const errorHandlerMiddleWare = require("./middleware/error-handler")

// Middleware
// json body parser
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", authenticateUser, postsRouter);

app.use(errorHandlerMiddleWare)
app.use(notFoundMiddleWare)

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
