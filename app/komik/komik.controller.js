const express = require("express");
const router = express.Router();
const komik = require("./komik.service");

router.get("/updated", async (req, res, next) => {
  try {
    const data = await komik.getUpdated();
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
