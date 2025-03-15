const { client } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const usersCollection = client.db('UsersTable').collection('users');

const register = async (req, res) => {
  // Check for existing user

  try {
    const result = await usersCollection.findOne({
      name: req.body.username,
      email: req.body.email
    });
    if (result !== null) return res.status(400).json("User already exists!");

    // Hash the password and create a user.
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    await usersCollection.insertOne({
      name: req.body.username,
      email: req.body.email,
      password: hash
    });

    return res.status(200).json("User is created.");
  } catch (err) {
    console.log(err);
    return res.status(503).json(err);
  }
}

const login = async (req, res) => {
  try {
    const result = await usersCollection.findOne({
      name: req.body.username
    });
    // console.log(result);
    if (result === null) return res.status(404).json("User does not exist!");

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

    if (!isPasswordCorrect) return res.status(400).json("Wrong password or username!");

    // add user info session to jwt which will be used later for authenticating purposes whether the person requesting
    // a change or something is the user it is and if it's session not expired;

    const token = jwt.sign({ id: result._id }, 'jwtkey');
    const { password, ...other } = result;

    res.cookie("access_token", token,{
      httpOnly:true,
    }).status(200).json(other);

  } catch (err) {
    console.log(err);
    return res.status(503).json(err);
  }
}

const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true,
  }).status(200).json("User has been logged out!")
}

module.exports = { register, login, logout };