const express = require("express");
const fruitsRouter = express.Router();
const someFruit = [{ name: "kiwi" }, { name: "durian" }, { name: "coconut" }];

/**
 * Some custom middleware function we created
 */

let count = 1;
function fruitLogger(req, res, next) {
  // console.log(
  //   `You're looking at the ${req.params.testFruit} on ${req.originalUrl} in the console.`
  // );
  console.log(
    `You're looking at the ${req.params.testFruit} on ${req.originalUrl} in the console.\n -> fruitLogger has run ${count} times!`
  );
  count++;
  next();
}

/**
 * New logTest route with `fruitLogger` as a GET method variable.
 * Any middleware function variables declared before the final (req, res) callback on any route, for any HTTP method, get run sequentially (aka why we have 3 instances of fruitlogger running per single visit to a `/logTest/:testFruit` route).
 * NB: It's NOT invoked
 */
fruitsRouter.get(
  "/logTest/:testFruit",
  fruitLogger,
  fruitLogger,
  fruitLogger,
  (req, res) => {
    res.send(`You're looking at ${req.params.testFruit} log test page.`);
  }
);

/**
 * The mounting point is /fruits as designated in server.js
 * All fruitsRouter routes are therefore "/fruits/{routeNameHere}"
 */

fruitsRouter.get("/banana", (req, res) => {
  // console.log(req);
  // res.json(req);
  // res.send("Banana more like sadnana.");
  res.send("We have 180 banana bunches in stock");
});

fruitsRouter.get("/mango", (req, res) => {
  // res.send("Mangos make the fansgo wild!");
  res.send("We have 500 mangoes in stock");
});

fruitsRouter.get("/blackberry", (req, res) => {
  // res.send("Blackberries give me the so-so merries.");
  res.send("We have 20 blackberry boxes in stock");
});

/**
 * You can separate multiple parameters in a route
 * e.g. http://localhost:6900/fruits/10/someRoute/dragonfruit
 * -> "Buy 10 of dragonfruit."
 */
fruitsRouter.get("/:quantity/someRoute/:fruitName", (req, res) => {
  res.send(`Buy ${req.params.quantity} of ${req.params.fruitName}.`);
});

/**
 * You can add static subroutes before, in-between, and after parameters as well
 * e.g. http://localhost:6900/fruits/oldFruit/10/route/dragonfruit/hello
 * -> "Buy 10 of dragonfruit."
 */
fruitsRouter.get("/oldFruit/:quantity/route/:fruitName/hello", (req, res) => {
  res.send(`Buy ${req.params.quantity} of ${req.params.fruitName}.`);
});

/**
 * Three blocks of router code, all with the same route/params
 * There's a better to combine methods off a single route
 * Whatever the param name is will be present as a key-value pair on the req.params object.
 */
fruitsRouter.get("/newFruit/:quantity/:nameOfFruit", (req, res) => {
  // res.send(`We don't have ${req.params.nameOfFruit} in our inventory`);

  // http://localhost:6900/fruits/newFruit/2boxes/cranberry
  // -> We should buy 2boxes of cranberry
  res.send(
    `We should buy ${req.params.quantity} boxes of ${req.params.nameOfFruit}`
  );
});
fruitsRouter.put("/newFruit/:nameOfFruit", (req, res) => {
  res.send(`Update ${req.params.fruitName} amount.`);
});
fruitsRouter.delete("/newFruit/:nameOfFruit", (req, res) => {
  res.send(`Zero out ${req.params.fruitName} stock.`);
});

/**
 * Instead of there separate router statements,
 * just use .route and chain the HTTP methods you need!
 *
 * Then you can feed the req/res callback directly to each method
 */
fruitsRouter
  .route("/:fruitName")
  .get((req, res) => {
    res.send(`We don't have ${fruitName} in our inventory.`);
  })
  .put((req, res) => {
    res.send(`Update ${req.params.fruitName} amount.`);
  })
  .delete((req, res) => {
    res.send(`Zero out ${req.params.fruitName} stock.`);
  });

// Ref to variable declared up top
// const someFruit = [{ name: "kiwi" }, { name: "durian" }, { name: "coconut" }];
fruitsRouter.param("badFruit", (req, res, next, badFruit) => {
  console.log(req.originalUrl);
  console.log(`param badFruit is ${badFruit}`);

  next();
});

fruitsRouter.get("/stock/:badFruit", (req, res) => {
  // It's like the .param() middleware is in this GET route
  // It runs before any other code here
  // console.log(req.originalUrl);
  // console.log(`param badFruit is ${badFruit}`);

  // next();

  res.send(`All the ${req.params.badFruit} in stock have gone bad!`);
});

// fruitsRouter.param("badFruit", (req, res, next, badFruit) => {
//   console.log(req.originalUrl);
//   console.log(`param badFruit is ${badFruit}`);

//   next();
// });

module.exports = fruitsRouter;
