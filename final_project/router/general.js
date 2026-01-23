const express = require("express");
let books = require("./booksdb.js");
let users = require("./auth_users.js").users;
let isValid = require("./auth_users.js").isValid;
let authenticatedUser = require("./auth_users.js").authenticatedUser;
const public_users = express.Router();

// TASK 6: Register a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// TASK 3: Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const authorName = req.params.author;
  let booksByAuthor = [];
  const isbns = Object.keys(books);

  for (const isbn of isbns) {
    const book = books[isbn];
    if (book.author === authorName) {
      booksByAuthor.push({ isbn: isbn, ...book });
    }
  }

  if (booksByAuthor.length > 0) {
    return res.status(200).json(booksByAuthor);
  } else {
    return res
      .status(404)
      .json({ message: "No books found for the given author" });
  }
});

// TASK 4: Get book details based on title
public_users.get("/title/:title", function (req, res) {
  const titleName = req.params.title;
  let booksByTitle = [];
  const isbns = Object.keys(books);

  for (const isbn of isbns) {
    const book = books[isbn];
    if (book.title === titleName) {
      booksByTitle.push({ isbn: isbn, ...book });
    }
  }

  if (booksByTitle.length > 0) {
    return res.status(200).json(booksByTitle);
  } else {
    return res
      .status(404)
      .json({ message: "No books found for the given title" });
  }
});

// TASK 5: Get book reviews based on ISBN
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
