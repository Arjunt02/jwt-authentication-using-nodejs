require("dotenv").config();

// 1.import express
const express = require("express");

// 2.create server
const app = express();

// 6.import jwt token
const jwt = require("jsonwebtoken");

// 7. use express in server
app.use(express.json());

let refreshTokens = [];

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({accessToken:accessToken})
  });
});


app.delete('logout',(req,res)=>{
  refreshToken=refreshToken.filter(token=>token!==req.body.token)
  res.sendStatus(204)
})


app.post("/login", (req, res) => {
  // first authenticate user in check video and add

  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
}

// 3. set port
app.listen(4000);
