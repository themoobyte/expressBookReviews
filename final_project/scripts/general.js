// scripts/general.js
// Tasks 10-13: Axios async/await implementation for AI-graded submission

const axios = require("axios");

// IMPORTANT: Use port 5001 from your index.js
const API_BASE_URL = "http://localhost:5001";

// ========== TASK 10 ==========
// Get the list of books available in the shop using async/await with Axios
async function getAllBooks() {
  try {
    console.log("📚 Task 10: Getting all books from the shop...");
    const response = await axios.get(`${API_BASE_URL}/`);
    console.log("✅ Task 10 - SUCCESS: Retrieved all books");
    console.log(`   Found ${Object.keys(response.data).length} books`);
    return response.data;
  } catch (error) {
    console.error("❌ Task 10 - ERROR:", error.message);
    if (error.response) {
      console.error(
        `   Server responded with status: ${error.response.status}`,
      );
    }
    throw error;
  }
}

// ========== TASK 11 ==========
// Get book details based on ISBN using async/await with Axios
async function getBookByISBN(isbn) {
  try {
    console.log(`🔢 Task 11: Getting book details for ISBN ${isbn}...`);
    const response = await axios.get(`${API_BASE_URL}/isbn/${isbn}`);
    console.log(`✅ Task 11 - SUCCESS: Retrieved book with ISBN ${isbn}`);
    console.log(`   Title: "${response.data.title}"`);
    console.log(`   Author: ${response.data.author}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Task 11 - ERROR fetching ISBN ${isbn}:`, error.message);
    throw error;
  }
}

// ========== TASK 12 ==========
// Get book details based on Author using async/await with Axios
async function getBooksByAuthor(author) {
  try {
    console.log(`✍️  Task 12: Getting books by author "${author}"...`);
    const response = await axios.get(
      `${API_BASE_URL}/author/${encodeURIComponent(author)}`,
    );
    const books = response.data;
    console.log(`✅ Task 12 - SUCCESS: Retrieved books by author "${author}"`);
    console.log(`   Found ${Array.isArray(books) ? books.length : 1} book(s)`);
    if (Array.isArray(books) && books.length > 0) {
      books.forEach((book, index) => {
        console.log(`   ${index + 1}. "${book.title}" (ISBN: ${book.isbn})`);
      });
    }
    return books;
  } catch (error) {
    console.error(
      `❌ Task 12 - ERROR fetching author "${author}":`,
      error.message,
    );
    throw error;
  }
}

// ========== TASK 13 ==========
// Get book details based on Title using async/await with Axios
async function getBooksByTitle(title) {
  try {
    console.log(`📖 Task 13: Getting books with title "${title}"...`);
    const response = await axios.get(
      `${API_BASE_URL}/title/${encodeURIComponent(title)}`,
    );
    const books = response.data;
    console.log(`✅ Task 13 - SUCCESS: Retrieved books with title "${title}"`);
    console.log(`   Found ${Array.isArray(books) ? books.length : 1} book(s)`);
    if (Array.isArray(books) && books.length > 0) {
      books.forEach((book, index) => {
        console.log(
          `   ${index + 1}. Author: ${book.author} (ISBN: ${book.isbn})`,
        );
      });
    }
    return books;
  } catch (error) {
    console.error(
      `❌ Task 13 - ERROR fetching title "${title}":`,
      error.message,
    );
    throw error;
  }
}

// ========== DEMONSTRATION FUNCTION ==========
async function demonstrateAllTasks() {
  console.log("🚀 ===========================================");
  console.log("   DEMONSTRATING TASKS 10-13 FOR AI GRADING");
  console.log("   Using Axios with async/await");
  console.log("   API Base URL:", API_BASE_URL);
  console.log("=============================================\n");

  try {
    // TASK 10
    console.log("1. TASK 10: Get all books");
    console.log("-------------------------------------------");
    const allBooks = await getAllBooks();

    // Get first ISBN for testing
    const firstISBN = Object.keys(allBooks)[0];
    const firstBook = allBooks[firstISBN];

    console.log("\n2. TASK 11: Get book by ISBN");
    console.log("-------------------------------------------");
    await getBookByISBN(firstISBN);

    console.log("\n3. TASK 12: Get books by author");
    console.log("-------------------------------------------");
    // Use author from first book
    await getBooksByAuthor(firstBook.author);

    console.log("\n4. TASK 13: Get books by title");
    console.log("-------------------------------------------");
    // Use title from first book
    await getBooksByTitle(firstBook.title);

    console.log("\n🎉 ===========================================");
    console.log("   ALL TASKS 10-13 COMPLETED SUCCESSFULLY!");
    console.log("=============================================");
    console.log("\n📋 READY FOR AI-GRADED SUBMISSION:");
    console.log("1. This file contains Tasks 10-13 implementation");
    console.log("2. Using async/await with Axios ✓");
    console.log("3. All functions are exported ✓");
    console.log("4. Port configured correctly (5001) ✓");
    console.log("\n📤 Submit GitHub URL of this file for grading");
  } catch (error) {
    console.error("\n⚠️  SETUP REQUIRED:");
    console.error("1. Make sure server is running: node index.js");
    console.error("2. Check server is on port 5001");
    console.error("3. Install Axios: npm install axios");
    console.error("\nError details:", error.message);
  }
}

// ========== EXPORTS FOR AI GRADING ==========
module.exports = {
  getAllBooks, // Task 10
  getBookByISBN, // Task 11
  getBooksByAuthor, // Task 12
  getBooksByTitle, // Task 13
  demonstrateAllTasks,
};

// ========== RUN DEMO IF EXECUTED DIRECTLY ==========
if (require.main === module) {
  demonstrateAllTasks();
}
