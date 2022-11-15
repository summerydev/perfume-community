const express = require("express");
var router = express.Router();

/** DB pool */
const pool = require("../db/db.js");

const { makeToken } = require("../util/jwt.js");
const jwt = require("../util/jwt.js");

router.use(function (req, res, next) {
  next();
});

/** 유저 로그인 */
router.put("/login", async (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;

  try {
    const loginCheckQuery = `select * from user where user_id=? and password=?`;
    const updateLoginDateQuery = `update user set login_date=now() where id=?`;
    const [result] = await pool.query(loginCheckQuery, [userid, password]);
    const user = result[0];

    if (result.length > 0) {
      const accessToken = makeToken({ userid: user.user_id });
      const refreshToken = jwt.refresh();
      await pool.query(updateLoginDateQuery, user.id);
      res.json({
        user: user,
        token: { accessToken, refreshToken },
      });
    } else {
      res.send({
        message: "아이디 또는 비밀번호가 일치하지 않습니다.",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ result: "fail", message: e });
  }
});

/** 유저 회원가입 */
router.post("/", async (req, res) => {
  const signupQuery = `insert into user (user_id, password, name, email, phone, created_date, role_id) values (?,?,?,?,?,now(),1)`;
  console.log(req);
  try {
    await pool.query(signupQuery, [
      req.body.userid,
      req.body.password,
      req.body.name,
      req.body.email,
      req.body.phone,
    ]);
    res.status(200).send({ result: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ result: "fail", message: e });
  }
});

/** 유저 회원가입 - 아이디 중복 체크 */
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const checkIdQuery =
    "select exists (select user_id from user where user_id=?) as isInit";
  try {
    const [result] = await pool.query(checkIdQuery, userId);
    const isInit = result[0].isInit;
    if (!isInit) {
      res.status(200).send({ result: "availableId" });
    } else if (isInit) {
      res.status(200).send({ result: "unavailableId" });
    }
  } catch (e) {
    console.log(e);
  }
});

/** 회원 정보 수정 */
router.put("/:id", async (req, res) => {
  const userPkId = req.params.id;
  const userUpdatequery =
    "update user set password=?, name=?, email=?, phone=? where id=?";
  try {
    const rows = await pool.query(userUpdatequery, [
      req.body.password,
      req.body.name,
      req.body.email,
      req.body.phone,
      userPkId,
    ]);
    if (rows.affectedRows == 1 && rows.changedRows == 1) {
      console.log("ok");
      res.status(200).send({ result: "success" });
    } else if (rows.affectedRows == 0) {
      res.status(200).send({ result: "no user" });
    } else {
      throw error;
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ result: "fail", message: e });
  }
});

/** 유저 개인 리뷰 조회 */
router.get("/:id/reviews", async (req, res) => {
  const userPkId = req.params.id;
  const getUserReviewQuery =
    "select r.id, r.user_id, r.recommendation, r.longevity, r.strength, r.gender, r.fragrance, r.content, r.created_date, p.perfume_name, p.image_name, p.path, b.name  from review r, perfume p, brand b where r.perfume_id=p.id and p.brand_id=b.id and user_id=? order by r.created_date desc";
  try {
    const [rows] = await pool.query(getUserReviewQuery, userPkId);
    res.json(rows);
  } catch (e) {
    console.log();
  }
});

module.exports = router;
