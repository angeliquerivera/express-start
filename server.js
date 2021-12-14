/**
 * BASE SETUP
 */
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.EXPRESS_PORT || 3000; //process.env stores environment variables using .env package. .env file reads

/**
 * ROUTES
 */

app.get("/sample", (req, res) => {
  res.status(200).send("This is a response on the /sample route");
  // res.sendStatus(404);
  // res.status(500).send("Sorry, something went wrong on our end");
});

// We'll create our routes here
const fruitsRouter = require("./routes/fruitsRouter");

// tell Express to apply the routes to our application
app.use("/fruits", fruitsRouter); // mount fruitsRouter onto /fruits

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
