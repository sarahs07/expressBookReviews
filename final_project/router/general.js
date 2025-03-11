const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const {username, password} = req.body;

  if(!isValid(username) || !isValid(password)){
    return res.send('Invalid username or password');
  }

  if(users.includes(username)){
    return res.send('username already exists')
  } 

  return res.send('username registered');
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if(books[isbn]){
    return res.send(books[isbn]);
  } else {
    return res.send({})
  }

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const booksMatched = [];
  for (const key in books) {
    if(books[key].author === req.params.author){
      booksMatched.push(books[key]);
    }
  }

  return res.send(booksMatched)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const booksMatched = [];
  for (const key in books) {
    if(books[key].title === req.params.title){
      booksMatched.push(books[key]);
    }
  }

  return res.send(booksMatched)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

async function getBooks(){
  try{
    const res = await axios.get("http://localhost:6000");
      console.log(res.data);
  }
  catch(e) {
    return 'Error fetching books'
  }
}

// Call the async function to execute the request
// getBooks();


async function getBookByIsbn(){
  try{
    const res = await axios.get("http://localhost:6000/isbn/2");
      console.log(res.data);
  }
  catch(e) {
    return 'Error fetching books'
  }
}

// Call the async function to execute the request
// getBookByIsbn();


async function getBookByAuthor(){
  try{
    const res = await axios.get("http://localhost:6000/author/sarah009");
      console.log(res.data);
  }
  catch(e) {
    return 'Error fetching books'
  }
}

// Call the async function to execute the request
 //getBookByAuthor();

async function getBookByTitle(){
  try{
    const res = await axios.get("http://localhost:6000/title/The Book Of Job");
      console.log(res.data);
  }
  catch(e) {
    return 'Error fetching books'
  }
}

// Call the async function to execute the request
getBookByTitle();

module.exports.general = public_users;
