const express = require("express");
var router = express.Router();

/** DB pool */
const pool = require("../db/db.js");

/** 전체 리뷰 리스트 조회 */
router.get("/", async (req, res) => {
  const getReviewQuery =
    "select r.id, r.user_id, r.recommendation, r.longevity, r.strength, r.gender, r.fragrance, r.content, r.created_date, p.perfume_name, p.image_name, p.path, b.name, u.name as user_name from review r, perfume p, brand b, user u where r.perfume_id=p.id and p.brand_id=b.id and r.user_id=u.id order by r.created_date desc";
  try {
    const [rows] = await pool.query(getReviewQuery);
    res.json(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send({ result: "fail", message: e });
  }
});

/** 리뷰 등록 */
router.post("/", async (req, res) => {
  // console.log(req.body); => undefined
  const insertReviewQuery = `insert into review (user_id, perfume_id, recommendation, longevity, strength, gender, fragrance, content, created_date, modified_date) values(?,?,?,?,?,?,?,?, now(), now())`;
  try {
    await pool.query(insertReviewQuery, [
      req.body.userPkId,
      req.body.perfumeId,
      req.body.recommendation,
      req.body.longevity,
      req.body.strength,
      req.body.gender,
      req.body.fragrance,
      req.body.content,
    ]);
    res.status(200).send({ result: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ result: "fail", message: e });
  }
});

/** 리뷰 수정 */
router.put("/:id", async (req, res) => {
  const reviewPkId = req.params.id;
  const updateReviewQuery =
    "update review set recommendation=?, longevity=?, strength=?, gender=?, fragrance=?, content=?, modified_date=now() where id=?";
  try {
    await pool.query(updateReviewQuery, [
      req.body.recommendation,
      req.body.longevity,
      req.body.strength,
      req.body.gender,
      req.body.fragrance,
      req.body.content,
      reviewPkId,
    ]);

    res.status(200).send({ result: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ result: "fail", message: e });
  }
});

module.exports = router;
