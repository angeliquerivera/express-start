const express = require("express");
const usersRouter = express.Router();

const someUsers = [{ name: "Angie" }, { name: "Christian" }];

/**
 * This router is mounted on `/users`
 */

usersRouter.get("/", (req, res) => {
  res.send("You're on the /users index route.");
});

usersRouter.get("/info", (req, res) => {
  // `/users/info?name=Angie` - one query param
  // `?name=Angie` is the query key name, with value Angie
  // console.log(req.query.name);

  // `/users/info?name=Angie&status=awesome` - multiple query params at once
  // `?name=Angie`
  console.log(req.query);
  console.log(req.query.name);
  console.log(req.query.status);

  res.send(
    `query 'name' value is: ${req.query.name}\n query 'status' value is ${req.query.status}`
  );
});

usersRouter.get("/:id", (req, res) => {
  res.send(`You're looking at user number ${req.params.id}!`);
});

usersRouter.get("/new", (req, res) => {
  res.render("users/new", { firstName: "default name" });
});

usersRouter.post("/", (req, res) => {
  console.log("req.body is", req.body, "\n");

  /**
   * Sample validation route
   */
  const isValid = true;
  if (isValid) {
    someUsers.push({ name: req.body.firstName });
    console.log(`Added ${req.body.firstName} to someUsers DB successfully!`);

    console.log("Now redirecting to that user page.");
    res.redirect(`/users/${someUsers.length - 1}`);
  } else {
    console.log("Error: Something went wrong in the POST method.");
    res.render("users/new", { firstName: req.body.firstName });
  }

  // res.send("Post method invoked");
});

function addSomeNumbers(req, res, next) {
  console.log("5");
  next();
}

function tellMeTheOriginalURL(req, res, next) {
  console.log("Current /users sub-route URL", req.originalUrl);
  next(); //tells express function is done so go to the next thing
}

let postViewCount = 0;

function addViewToTotalCount(req, res, next) {
  postViewCount++;
  console.log(`/users/customMiddleware page view count is: ${postViewCount}`);
  next();
}

usersRouter.get(
  "/example/customMiddleware",
  addViewToTotalCount,
  tellMeTheOriginalURL,
  (req, res) => {
    res.send("Now displaying the welcome message");
  }
);

/**
 * `/users/customMiddleware` route execution
 *
 * 0. Visit `/users/customMiddleware` route
 * 1. Express checks to see if there is an associated method for this route
 * 1a. "Hey, there's a GET method, run that"
 * 2. Run any/all middleware functions this method has
 * 3. Run `tellMeTheOriginalURL`
 * 3a. Print out the console log message
 * 3b. Invoke the next() function; this middleware is done
 * 4.  No more middleware to run; run the request/response callback
 * 4a. Send a response with the message
 */

module.exports = usersRouter;
