require("dotenv").config();

// 1.import express
const express = require("express");

// 2.create server
const app = express();

// 6.import jwt token
const jwt = require("jsonwebtoken");

// 7. use express in server
app.use(express.json());

// 4.create posts
const posts = [
  {
    username: "john",
    title: "first post",
  },
  {
    username: "peter",
    title: "second post",
  },
  {
    username: "olivia",
    title: "third post",
  },
];

// 5.create route
app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter(post=>post.username===req.user.name));
});



function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is invalid" });
    req.user = user;
    next();
  });
}

// 3. set port
app.listen(3000);
