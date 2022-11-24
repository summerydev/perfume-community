const express = require("express");
var router = express.Router();

/** DB pool */
const pool = require("../db/db.js");

router.use(function (req, res, next) {
  next();
});

/** 조회 - 향수 전체 목록 */
router.get("/", async (req, res) => {
  const getPerfumesQuery = `select p.id, p.perfume_name, p.image_name, p.path, p.modified_date, p.brand_id, b.name from perfume p, brand b where p.brand_id=b.id  order by modified_date desc`;
  try {
    const [result] = await pool.query(getPerfumesQuery);
    res.json(result);
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
    console.log(e);
  }
});

/** 등록 - 향수 */
router.post("/", async (req, res) => {
  const addPerfumeQuery = `insert into perfume (brand_id, perfume_name, image_name, path, created_date, modified_date) values(?, ?, ?, ?, now(), now());`;
  try {
    const [result] = await pool.query(addPerfumeQuery, [
      req.body.brandId,
      req.body.perfumeName,
      `${req.body.perfumeName}_image`,
      req.body.path,
    ]);
    res.json(result);
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
  }
});

/** 조회 - 향수별 리뷰 통계 */
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
    console.log(perfumes);
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

/** 조회 - 개별 향수 */
router.get("/:id", async (req, res) => {
  const perfumeId = req.params.id;
  console.log(perfumeId);
  const getPerfumesQuery = `select p.id, p.perfume_name, p.image_name, p.path, p.modified_date, p.brand_id, b.name from perfume p, brand b where p.brand_id=b.id and p.id=? order by modified_date desc`;
  try {
    const [result] = await pool.query(getPerfumesQuery, perfumeId);
    res.json(result[0]);
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
    console.log(e);
  }
});

/** 수정 - 개별 향수 */
router.put("/:id", async (req, res) => {
  const updatePerfumeQuery = `update perfume set brand_id=?, perfume_name=?, image_name=?, path=?, modified_date=now() where id=?`;
  try {
    const [result] = await pool.query(updatePerfumeQuery, [
      req.body.brandId,
      req.body.perfumeName,
      `${req.body.perfumeName}_image`,
      req.body.path,
      req.params.id,
    ]);
    if (result.affectedRows == 1) {
      res.status(200).send({ ok: true });
    } else if (result.affectedRows == 0) {
      res.status(200).send({ ok: false });
    }
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
  }
});

/** 조회 - 향수 검색 */
router.get("/search/:searchKey", async (req, res) => {
  const searchKey = req.params.searchKey;
  const getPerfumeIdQuery = `(select p.id, p.perfume_name, p.brand_id, b.name from perfume p, brand b where p.perfume_name like ? and p.brand_id=b.id)
  union
  (select p.id, p.perfume_name, b.id, b.name from brand b, perfume p where b.name like ? and b.id=p.brand_id)`;

  try {
    const [perfumes] = await pool.query(getPerfumeIdQuery, [
      `%${searchKey}%`,
      `%${searchKey}%`,
    ]);
    res.json(perfumes);
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
  }
});

module.exports = router;
