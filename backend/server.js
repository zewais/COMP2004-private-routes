//Initialize the server
const express = require("express");
const server = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cors = require("cors");
const port = 3000;
require("dotenv").config();
const { DB_URI, JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

//Middleware
server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

//Connect to MongoDB
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Connected to DB\nServer listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Routes
server.get("/", (request, response) => {
  response.send("LIVE!");
});

//Register route with bcrypt hashing password
server.post("/register", async (request, response) => {
  const { username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  try {
    await newUser
      .save()
      .then((result) => response.status(201).send("User created"));
  } catch (error) {
    response.status(400).send(error);
  }
});

//Login route
server.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const jwtToken = jwt.sign({ id: username }, JWT_SECRET);

  const user = await User.findOne({ username }).then((user) => {
    //If user is not found in the database return 400 status
    if (!user) {
      return response.send({ message: "User not found" });
    }
    //If user is found in the database compare the password with bcrypt
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) {
        return response.send({ message: "An error occured" });
      }
      if (result) {
        return response
          .status(200)
          .send({ message: "User authenticated", token: jwtToken });
      } else {
        return response.send({ message: "Incorrect username or password" });
      }
    });
  });
});
