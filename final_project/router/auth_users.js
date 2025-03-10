const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
const JWT_STRING = "aVeryVerySecretStr"; 

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  return username && username.length > 1 ? true : false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    if(username === 'sarah009' && password === 'testing123'){
      return true;
    }

    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  if(!isValid(username) || !isValid(password)){
    return res.send('Invalid username or password');
  }

  if(authenticatedUser(username, password)){
    return res.json({token: jwt.sign({username}, JWT_STRING, {expiresIn: '1h'})});
  }

  return res.status(401).json({message: "Invalid username and/or password"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  console.log(req);
  return res.status(300).json({message: "Yet to be implemented"});

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
