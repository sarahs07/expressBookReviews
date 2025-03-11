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
    let accessToken = jwt.sign({username}, JWT_STRING, {expiresIn: '1h'});
    
    req.session.authorization = { accessToken, username};
    return res.status(200).send("User successfully logged in.")

  }

  return res.status(401).json({message: "Invalid username and/or password"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const review = req.query.review;
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  const map = new Map(Object.entries(books));
  if(map.has(isbn) && map.get(isbn).author === username){
    books[isbn].reviews = review;
    return res.status(201).json({message: "Review updated", book: books[isbn]});
  } else {
    map.set(isbn, {reviews: review, author: username});
    books = Object.fromEntries(map);
    return res.status(201).json({message: "Review added", books});
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const bookIsbn = req.params.isbn;
  if(req.user.username == books[bookIsbn].author){
    books[bookIsbn].reviews = "";
    return res.status(201).json({message: "Review successfully deleted"});
  } else {
    return res.status(403).json({message: 'Unable to delete review'})
  }


});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
