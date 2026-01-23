const express = require('express');
const books = require('./router/booksdb.js');
const app = express();
const PORT = 5001;

app.use(express.json());

// Store users in memory
let users = [];

// TASK 6: Register a new user
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  
  users.push({ username, password });
  return res.status(200).json({ message: "User registered successfully" });
});

// Get all books
app.get("/", (req, res) => {
  res.json(books);
});

// Get book by ISBN
app.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.json(books[isbn]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// TASK 3: Get books by author
app.get("/author/:author", (req, res) => {
  const authorName = req.params.author;
  let booksByAuthor = [];
  
  for (const isbn in books) {
    if (books[isbn].author === authorName) {
      booksByAuthor.push({ isbn, ...books[isbn] });
    }
  }
  
  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);
  } else {
    res.status(404).json({ message: "No books found for the given author" });
  }
});

// TASK 4: Get books by title
app.get("/title/:title", (req, res) => {
  const titleName = req.params.title;
  let booksByTitle = [];
  
  for (const isbn in books) {
    if (books[isbn].title === titleName) {
      booksByTitle.push({ isbn, ...books[isbn] });
    }
  }
  
  if (booksByTitle.length > 0) {
    res.json(booksByTitle);
  } else {
    res.status(404).json({ message: "No books found for the given title" });
  }
});

// TASK 5: Get book reviews
app.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.json(books[isbn].reviews || {});
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log("📝 Ready to create submission files!");
  console.log("\nTest commands:");
  console.log('1. Register: curl -X POST http://localhost:5001/register -H "Content-Type: application/json" -d \'{"username":"test","password":"test"}\'');
  console.log("2. Get by author: curl http://localhost:5001/author/Chinua%20Achebe");
  console.log("3. Get by title: curl http://localhost:5001/title/Things%20Fall%20Apart");
  console.log("4. Get reviews: curl http://localhost:5001/review/1");
});
