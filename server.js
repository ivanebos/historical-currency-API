const express = require("express");
const app = express();
const mainRoute = require("./routes/mainRoute");

// Middleware to parse JSON bodies
app.use(express.json());

// Use main route
app.use("/api", mainRoute);

// Set up the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//Export app for testing
module.exports = app;
