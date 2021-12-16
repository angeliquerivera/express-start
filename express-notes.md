# Intro to Express

## What is ExpressJS?

- ExpressJS is a nodejs framework that lets you build web application servers for single-paged, multi-paged and hybrid web applications.
- What ExpressJS does is allow us to create APIs really easily
- ExpressJS is unopinionated; you can designate how you put together your server free from basic requirements.
- ExpressJS will allow us to build a web server API that follows RESTful conventions and provides an API for client requests to interact with a database and provide meaningful responses back to the client.

## What is an API? What does it stand for?

- API stands for Application Programming Interface.
- APIs let your service and products communicate with other products and services.
- APIs are like waiters at a restaurant. They communicate your orders to the kitchen.
- API lets you interact with other software without letting you know how it's implemented (aka you can order steak Diane and don't have to know how to make it, the kitchen does that for you).
- API knows how to take the request, process it as data, and send the information back to you without you seeing the process.

## What/who uses API? What are the two sides to a API "conversation"?

- Request side: Client
- Response side: Server

### What is a client? What is a server?

- The client (program/web browser) requests data of the server via the API
- The server is a series of code that does many things, like processing a client request for data, reaching out to the database with the correct query, and processing/packaging a response with the info the client needs.
- Additonally, servers can serve static files like HTML, CSS, and pictures.

### What is the relationship between client and server?

- The client and the server act independently.
- The client initiates the API conversation by sending a request for information.
- The server waits for the request and will respond accordingly.

## What is REST? What does REST stand for?

- REST stands for REpresentational State Transfer.
- REST is a system of rules/constraints. It's not a protocol nor a standard.

### What is "state" in REST?

- State refers to the literal current state of information at a given moment. It's something the application remembers (browser history, browser preferences and saved passwords are examples of state.)
- REST is stateless!

### What does REST being stateless mean?

- Each individual request contains all the information to perform the request and return a response regardless of the other requests made by the same API user

### What is an example of a request that proves the statelessness in REST?

- Example of this is you're logged out of IG (different computer/browser) and try to "like" a picture. It redirects to the login page and asks for your information. You put in your information and it logs you in. Then IG completes the request to "like" the photo by redirecting you back to the page as an authenticated user aka "logged in" user where the photo is now "liked".

## What is a resource?

- Any object that the API can provide information about.
- An example of a resource can be a username, photo, or hashtag in Instagram.
- The identifier can be a name or a number.

### What are some of the qualities of RESTful API?

- Client only make one request at a time.
- It doesn't remember any data about the interaction.
- RESTful web services should NEVER keep the client state on the server.

## What is CRUD? What does CRUD stand for?

- CRUD stands for Create, Read, Update, and Delete.
- A model (database) should have the ability to perform these four functions in order to be complete.

### What is an example of a model?

A template for the information stored by a database. If a library was a database, some database models it might have are:

```json
"book": {
  "uid": <Integer> autogen,
  "title": <String>,
  "author": <String>,
  "isbn": <Integer>
}
```

```json
"patron": {
  "uid": "<Integer> autogen",
  "name": <String>,
  "joinDate": <Date>,
  "accountStanding" <String[] "good" | "bad">,
  "booksOnLoan": <Integer[] Book.uid | []> // establishing the relation between books and patrons
}
```

### What are some of the specific details of each CRUD method?

- Create: the ability to add new info into the database based on some form of information model.

  - e.g. the ability to add a new patron or a new book to the database

- Read: the ability to see one, many or all of a set of requested information based on given parameters.

  - e.g. the ability to get a book with one specific uid or the ability to get all books that have a given author or the ability to get all books available in the library. Another example is read the database and retrieve all the books that a specific patron has loaned out.

- Update: the ability to modify existing database entries.

  - e.g. the ability to change the value of an author for a specific book. Another example would be changing the accountStanding of a specific patron from "good" to "bad" or vice versa. You can also add or remove books from a specific patron's booksOnLoan array.

- Delete: the ability to remove existing data from the database.

  - e.g. the ability to delete a patron entry.

## What does `express.Router()` do? How is it different from the server.js `express()` invocation?

- It creates a mini app that is modular and you can export for use in the main express app.

### Using parameters in routes

#### What is a route parameter?

- Route parameters are portions of a URL that are used to capture the values at their specified positions in the URL.
- Example: "twitter.com/user"

```js
router.get("/:user", (req, res) => {
  res.send(`You're looking at Twitter user ${user}.`);
});
```

#### Single Param

##### How do you designate a route to use a single parameter?

If the parameter you want to name is called `quantity`, then you can define it and call upon it like so:

```js
fruitsRouter.get("/newFruit/:quantity", (req, res) => {
  res.send(`Buy ${req.params.quantity} fruits.`);
});
```

##### Does slash route order for parameter?

Are these two routes the same?

```js
fruitsRouter.get("/newFruit/:quantity/:fruitName", (req, res) => {
  res.send(`Buy ${req.params.quantity} of ${req.params.fruitName}.`);
});
```

```js
fruitsRouter.get("/newFruit/:fruitName/:quantity", (req, res) => {
  res.send(`Buy ${req.params.quantity} of ${req.params.fruitName}.`);
});
```

##### Can you separate parameters in a route?

```js
fruitsRouter.get("/:quantity/someRoute/:fruitName", (req, res) => {
  res.send(`Buy ${req.params.quantity} of ${req.params.fruitName}.`);
});
```

## `.param()`, parameter based middleware

## Dangers of base route parameters; how they interact with routers

```js
// We'll create our routes here
const fruitsRouter = require("./routes/fruitsRouter");
const twitterRouter = require("./routes/twitterRouter");

// tell Express to apply the routes to our application
app.use("/fruits", fruitsRouter); // mount fruitsRouter onto /fruits
app.use("/twitter", twitterRouter);

// Fallback for non-specified routes off index route
app.get("/:id", (req, res) => {
  res.send(`You're looking at number ${req.params.id}!`);
});
```

- We visited browser at `/twitter` BEFORE we designated an index route for `/twitter`.
- Because there was no index route code set up for `/twitter/`, the express app default to the `/:id` route parameter, which sent the `You're look at number ${req.params.id} response`.
- Then we updated `twitterRouter` with base route information, which means that when we refreshed the `/twitter/` route, we received the `/twitter/` response "To visit a Twitter user's page, just add their username as a route after /twitter."

## View Engines

### What is a view/template engine?

- A view/template engine allows you to use static template files in your application and when the application is run, it replaces variables inside that template with actual values. It transforms the template into an HTML file that is sent to the client.

### What are some view engines you can use with Express?

- Pug, EJS, Handlebars, React
