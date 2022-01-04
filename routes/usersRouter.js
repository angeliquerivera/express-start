const express = require("express");
const usersRouter = express.Router();

const someUsers = [{ name: "Angie" }, { name: "Christian" }];

/**
 * This router is mounted on `/users`
 */

usersRouter.get("/new", (req, res) => {
  res.render("users/new", { firstName: "default name" });
});

usersRouter.post("/", (req, res) => {
  console.log(req.body);
  const isValid = false;
  if (isValid) {
    someUsers.push({ name: req.body.firstName });
    res.redirect(`/users/${someUsers.length - 1}`);
  } else {
    console.log("Error: Something went wrong in the POST method.");
    res.render("users/new", { firstName: req.body.firstName });
  }

  // res.send("Post method invoked");
});

module.exports = usersRouter;
