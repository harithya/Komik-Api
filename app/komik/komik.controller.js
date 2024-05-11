const express = require("express");
const router = express.Router();
const komik = require("./komik.service");

router.get("/homepage", async (req, res, next) => {
  try {
    const updated = await komik.getKomik("manga/?status=&type=&order=update");
    const popular = await komik.getKomik("manga/?status=&type=&order=popular");
    const latest = await komik.getKomik("manga/?status=&type=&order=latest");
    return res.json({
      updated,
      popular,
      latest,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/daftar-komik", async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const response = await komik.getKomik("manga?page=", page);
    return res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const response = await komik.getDetailKomik(req.params.slug);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
