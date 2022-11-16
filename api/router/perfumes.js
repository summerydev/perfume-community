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

/** 향수별 리뷰 통계 */
router.get("/reviews", async (req, res) => {
  const getPerfumesReviews = `select 
  p.id, 
  p.perfume_name, 
  b.name,
  p.image_name,
  p.path,
  count(case when r.recommendation=1 then 1 end) as recommendation,
  count(case when r.id is null then 0 else r.id end) as review_count, 
  round(avg(longevity=0)*100, 0) as l0,
  round(avg(longevity=1)*100, 0) as l1,
  round(avg(longevity=2)*100, 0) as l2
  from perfume p, review r, brand b
  where p.id=r.perfume_id
  and p.brand_id=b.id
  group by p.id, p.perfume_name, p.brand_id, p.id, p.id, p.id, p.id, p.id, p.id, p.id;`;

  try {
    const [rows] = await pool.query(getPerfumesReviews);
    console.log(rows);
    res.json(rows);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
