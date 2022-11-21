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
    res.status(500).send({ ok: false, message: e });
  }
});

/** 향수별 리뷰 통계 */
router.get("/reviews", async (req, res) => {
  const getPerfumesReviewsQuery = `select p.id, p.perfume_name, b.name as brand_name, ifnull(r.cnt_review, 0) as cnt_review,  p.image_name, p.path
  from perfume p
  left outer join (
  select 
  count(id) as cnt_review, perfume_id
  from review group by perfume_id
  ) as r
  on p.id=r.perfume_id
  left join brand b
  on p.brand_id=b.id`;

  const getRecommendationCountQuery = `select perfume_id as id, recommendation, count(recommendation) as ctn_recommendation from review group by perfume_id, recommendation`;
  const getLongevityCountQuery = `select perfume_id as id, longevity, count(longevity) as ctn_longevity from review group by perfume_id, longevity`;
  const getStrengthCountQuery = `select perfume_id as id, strength, count(strength) as ctn_strength from review group by perfume_id, strength`;
  const getGenderCountQuery = `select perfume_id as id, gender, count(gender) as ctn_gender from review group by perfume_id, gender`;

  try {
    const [perfumes] = await pool.query(getPerfumesReviewsQuery);
    const [recommendationCount] = await pool.query(getRecommendationCountQuery);
    const [longevityCount] = await pool.query(getLongevityCountQuery);
    const [strengthCount] = await pool.query(getStrengthCountQuery);
    const [genderCount] = await pool.query(getGenderCountQuery);

    for (let perfume of perfumes) {
      const detail = {
        recommendation: {},
        longevity: {},
        strength: {},
        gender: {},
      };

      Object.assign(perfume, detail);
      recommendationCount
        .filter((el) => perfume.id == el.id)
        .map((el) => {
          perfume.recommendation[el.recommendation] = el.ctn_recommendation;
        });
      longevityCount
        .filter((el) => perfume.id == el.id)
        .map((el) => {
          perfume.longevity[el.longevity] = el.ctn_longevity;
        });
      strengthCount
        .filter((el) => perfume.id == el.id)
        .map((el) => {
          perfume.strength[el.strength] = el.ctn_strength;
        });
      genderCount
        .filter((el) => perfume.id == el.id)
        .map((el) => {
          perfume.gender[el.gender] = el.ctn_gender;
        });
    }
    console.log(perfumes[0]);
    res.json(perfumes);
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
  }
});

module.exports = router;
