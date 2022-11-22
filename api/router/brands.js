const express = require("express");
var router = express.Router();

/** DB pool */
const pool = require("../db/db.js");

router.use(function (req, res, next) {
  next();
});

/** 브랜드 전체 조회 */
router.get("/", async (req, res) => {
  const getBrandsQuery = `select * from brand`;
  try {
    const [brands] = await pool.query(getBrandsQuery);
    res.json(brands);
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
  }
});

/** 브랜드 검색 */
router.get("/:searchKey", async (req, res) => {
  const searchKey = req.params.searchKey;
  const getBrandIdQuery = `select id, name from brand where name like ?;`;

  try {
    const [brands] = await pool.query(getBrandIdQuery, `%${searchKey}%`);
    res.json(brands);
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
  }
});

module.exports = router;
