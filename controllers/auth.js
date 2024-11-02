const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
		const user = await User.create({ ...req.body });
		const token = user.createJWT();
		res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError("Invalid Credentials");
	}
	// compare password
	const isPasswordCorect = await user.comparePassword(password);
	if (!isPasswordCorect) {
		throw new UnauthenticatedError("Invalid Credentials");
	}
	const token = user.createJWT();
	let cookieOptions = {
		expires: new Date(Date.now() + 90* 24 * 60 * 60 * 100),
		httpOnly: true,
		sameSite: 'None',
		secure: true,
	};
	if (process.env.NODE_ENV === "production") {
		cookieOptions.secure = true
	}
  res.set('Access-Control-Allow-Credentials', 'true');
	res.set({'Access-Control-Allow-Origin': req.headers.origin})
	res.cookie("access_token", token, cookieOptions).status(StatusCodes.OK).json({user:{name:user.name}, token})
};

module.exports = { register, login };
