/**
 * BASE SETUP
 */
require("dotenv").config();
const express = require("express");
const app = express(); //running entire express application
const port = process.env.EXPRESS_PORT || 3000; //process.env stores environment variables using .env package. .env file reads

/**
 * Selecting the view/template engine for express
 */
app.set("view engine", "ejs");

/**
 * Serving static files using the built-in static
 */
app.use(express.static("public"));

/**
 * This allows us to access the body
 * The parameter is boilerplate code; allows us to avoid warning
 * urlencoded is a built in middleware function that's part of express that parses incoming requests with urlencoded payloads (based on body-parser)
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Another common built-in middleware to handle JSON data
 * Same as urlencoded, but for JSON requests
 */
app.use(express.json());

/**
 * Sample Routes
 */
app.get("/", (req, res) => {
  console.log("on the index route");

  const indexPageData = {
    serverText: "hello from the server side, index page",
  };

  res.render("index", indexPageData);
});

app.get("/sample", (req, res) => {
  res.status(200).send("This is a response on the /sample route");
  // res.sendStatus(404);
  // res.status(500).send("Sorry, something went wrong on our end");
});

// We'll create our routes here
const fruitsRouter = require("./routes/fruitsRouter");
const twitterRouter = require("./routes/twitterRouter");
const usersRouter = require("./routes/usersRouter");

// tell Express to apply the routes to our application
app.use("/fruits", fruitsRouter); // mount fruitsRouter onto /fruits
app.use("/twitter", twitterRouter);
app.use("/users", usersRouter);

app.get("/users", (req, res) => {
  res.send("You're on the /users route.");
});

app.get("/:id", (req, res) => {
  res.send(`You're looking at number ${req.params.id}!`);
});

app.get("/users/:id", (req, res) => {
  res.send(`You're looking at user number ${req.params.id}!`);
});

// app.get("/:id", (req, res) => {
//   res.send(`You're looking at number ${req.params.id}!`);
// });

/**
 * START THE SERVER
 */
app.listen(port, () => {
  console.log(`Angie's War Crimes Server now working on ${port}`);
});
