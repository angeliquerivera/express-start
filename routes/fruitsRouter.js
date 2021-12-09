const express = require("express");
const fruitsRouter = express.Router();

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
 * Three blocks of router code, all with the same route/params
 * There's a better to combine methods off a single route
 */
// fruitsRouter.get("/:fruitName", (req, res) => {
//   res.send(`We don't have ${req.params.fruitName} in our inventory`);
// });
// fruitsRouter.put("/:fruitName", (req, res) => {
//   res.send(`Update ${req.params.fruitName} amount.`);
// });
// fruitsRouter.delete("/:fruitName", (req, res) => {
//   res.send(`Zero out ${req.params.fruitName} stock.`);
// });

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

const someFruit = [{ name: "kiwi" }, { name: "durian" }, { name: "coconut" }];

// fruitsRouter.param("fruitName", (req, res, next, fruitName) => {
//   console.log(fruitName);
//   next();
// });

module.exports = fruitsRouter;
