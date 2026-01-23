const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 5001;

app.use(express.json());

// Use session middleware
app.use(session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

// Import routes directly
const generalRouter = require('./router/general.js').general;
const authRouter = require('./router/auth_users.js').authenticated;

// Mount routers
app.use("/", generalRouter);
app.use("/customer", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("General routes available at: http://localhost:" + PORT);
  console.log("Auth routes available at: http://localhost:" + PORT + "/customer");
});
