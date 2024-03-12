const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
});

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Register user
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  connection.query(query, [username, password], (err, results) => {
    if (err) throw err;

    res.json({ success: true, message: "User registered successfully" });
  });
});

// CRUD operations go here...

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
