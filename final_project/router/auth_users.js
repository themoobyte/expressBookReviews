const express = require('express');
const books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  return users.some(user => user.username === username);
};

const authenticatedUser = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
};

// TASK 7: Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }
  
  if (authenticatedUser(username, password)) {
    req.session.username = username;
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// Middleware to check login
const checkAuth = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    return res.status(401).json({ message: "Please login first" });
  }
};

// TASK 8: Add/modify review
regd_users.put("/auth/review/:isbn", checkAuth, (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.username;
  
  if (!review) {
    return res.status(400).json({ message: "Review required" });
  }
  
  if (books[isbn]) {
    if (!books[isbn].reviews) books[isbn].reviews = {};
    books[isbn].reviews[username] = review;
    return res.status(200).json({ message: "Review added/updated" });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// TASK 9: Delete review
regd_users.delete("/auth/review/:isbn", checkAuth, (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.username;
  
  if (books[isbn] && books[isbn].reviews && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Review deleted" });
  } else {
    return res.status(404).json({ message: "Review not found" });
  }
});

// Export everything
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.authenticatedUser = authenticatedUser;
