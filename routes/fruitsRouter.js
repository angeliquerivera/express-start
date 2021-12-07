const express = require("express");
const fruitsRouter = express.Router();

/**
 * The mounting point is /fruits as designated in server.js
 * All fruitsRouter routes are therefore "/fruits/{routeNameHere}"
 */

fruitsRouter.get("/banana", (req, res) => {
  // console.log(req);
  // res.json(req);
  res.send("Banana more like sadnana.");
});

fruitsRouter.get("/mango", (req, res) => {
  res.send("Mangos make the fansgo wild!");
});

fruitsRouter.get("/blackberry", (req, res) => {
  res.send("Blackberries give me the so-so merries.");
});

module.exports = fruitsRouter;
