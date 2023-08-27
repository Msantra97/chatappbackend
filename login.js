const USERS = require("./models/users")
const bcrypt = require("bcrypt")
const JWT_SECRET = "Monoj123"
const jwt = require('jsonwebtoken')

module.exports = async function login(req, res) {
  const { email, password } = req.body
  console.log(req.body);
  const user = await USERS.findOne({ email })
  console.log("user", user);
  if (!user?._id) {
    res.send({
      success: false,
      error: "Email does not belong to a user"
    })
    return
  }
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    res.send({
      success: false,
      error: "Email or password does not match"
    })
    return
  }

  const timeStamp = Date.now()

  const authToken = jwt.sign({ userId: user._id, createdAt: timeStamp, expiresAt: timeStamp + 2 * 24 * 60 * 60 * 1000 }, JWT_SECRET);
  
  res.send({
    success:true,
    user, 
    JWT: authToken
  })

}