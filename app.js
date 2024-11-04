require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// json body parser
app.use(express.json());
app.use(cookieParser());

// Connect DB
const connectDB = require("./db/connect");

const authenticateUser = require("./middleware/authentication");

// Routers
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");

// Error handlers
const notFoundMiddleWare = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");

// Middleware

app.use(
	cors({
		origin: "http://127.0.0.1:5173",
		credentials: true,
	})
);
		
app.use("/api/v1/", (req, res, next) => {
	console.log("app.js");
	next();
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", authenticateUser, postsRouter);
app.use("/api/v1/posts/comments", commentRouter);

app.use(errorHandlerMiddleWare);
app.use(notFoundMiddleWare);

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
