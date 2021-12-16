const express = require("express");
const twitterRouter = express.Router();

/**
 * Routes created here are mounted on `/twitter`
 */

twitterRouter.get("/", (req, res) => {
  res.send(
    "To visit a Twitter user's page, just add their username as a route after /twitter."
  );
});

// Korone's twitter is @inugamikorone
// momosuzunene
twitterRouter.get("/:userName", (req, res) => {
  // res.send(
  //   `Redirecting to ${req.params.userName} Twitter page in 3 seconds...`
  // );
  res.redirect(`https://twitter.com/${req.params.userName}`);
});

module.exports = twitterRouter;
