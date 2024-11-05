const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.cookie
  if (!authHeader || !authHeader.startsWith('access_token')) {
    throw new UnauthenticatedError('Authentication invalid')
  } 
  const token = authHeader.split('=')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = {userId:payload.userId, name:payload.name}
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth
