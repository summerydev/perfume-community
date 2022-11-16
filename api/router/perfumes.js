const express = require("express");
var router = express.Router();

/** DB pool */
const pool = require("../db/db.js");

router.use(function (req, res, next) {
  next();
});

/** 향수 검색 */
router.get("/", async (req, res) => {
  const searchKey = req.query.searchKey;
  const getPerfumeIdQuery =
    "select id, perfume_name from perfume where perfume_name like ?";
  try {
    const [rows] = await pool.query(getPerfumeIdQuery, `%${searchKey}%`);
    res.json(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send({ result: "fail", message: e });
  }
});
module.exports = router;
