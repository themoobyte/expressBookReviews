const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Task 1: Get the book list available in the shop
public_users.get("/", function (req, res) {
  // Using JSON.stringify for neat output as per hint
  return res.status(200).send(JSON.stringify(books, null, 2));
});

// Task 2: Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    return res.status(200).send(JSON.stringify(book, null, 2));
  } else {
    return res.status(404).send(JSON.stringify({message: "Book not found"}, null, 2));
  }
});

// Task 3: Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const matchingBooks = [];
  
  for (const isbn in books) {
    if (books[isbn].author === author) {
      matchingBooks.push({isbn: isbn, ...books[isbn]});
    }
  }
  
  if (matchingBooks.length > 0) {
    return res.status(200).send(JSON.stringify(matchingBooks, null, 2));
  } else {
    return res.status(404).send(JSON.stringify({message: "No books found by this author"}, null, 2));
  }
});

// Task 4: Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const matchingBooks = [];
  
  for (const isbn in books) {
    if (books[isbn].title === title) {
      matchingBooks.push({isbn: isbn, ...books[isbn]});
    }
  }
  
  if (matchingBooks.length > 0) {
    return res.status(200).send(JSON.stringify(matchingBooks, null, 2));
  } else {
    return res.status(404).send(JSON.stringify({message: "No books found with this title"}, null, 2));
  }
});

// Task 5: Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book && book.reviews) {
    return res.status(200).send(JSON.stringify(book.reviews, null, 2));
  } else {
    return res.status(404).send(JSON.stringify({message: "No reviews found for this book"}, null, 2));
  }
});

module.exports.general = public_users;
