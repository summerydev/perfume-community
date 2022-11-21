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
      const accessToken = makeToken({ userid: user.userid });
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
    res.status(500).send({ ok: false, message: e });
  }
});

/** 새로고침 로그인 풀림 방지 */
router.put("/login/:id", async (req, res) => {
  const userPkId = req.params.id;
  const getUserInfoQuery = `select * from user where id=?`;
  try {
    const [result] = await pool.query(getUserInfoQuery, userPkId);
    res.json({
      user: result[0],
    });
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
  }
});

/** 유저 회원가입 */
router.post("/", async (req, res) => {
  const signupQuery = `insert into user (user_id, PASSWORD(password), name, email, phone, created_date, role_id) values (?,?,?,?,?,now(),1)`;
  try {
    await pool.query(signupQuery, [
      req.body.userid,
      req.body.password,
      req.body.name,
      req.body.email,
      req.body.phone,
    ]);
    res.status(200).send({ ok: true });
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
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
    if (isInit) {
      res.status(200).send({ ok: false });
    } else if (!isInit) {
      res.status(200).send({ ok: true });
    }
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
  }
});

/** 회원 정보 수정 */
router.put("/:id", async (req, res) => {
  const userPkId = req.params.id;
  const userUpdatequery =
    "update user set password=?, name=?, email=?, phone=? where id=?";
  try {
    const [rows] = await pool.query(userUpdatequery, [
      req.body.password,
      req.body.name,
      req.body.email,
      req.body.phone,
      userPkId,
    ]);
    if (rows.changedRows == 1) {
      res.status(200).send({ ok: true });
    } else if (rows.affectedRows == 0) {
      res.status(200).send({ ok: false });
    }
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
  }
});

/** 유저 개인 리뷰 조회 */
router.get("/:id/reviews", async (req, res) => {
  const userPkId = req.params.id;
  const getUserReviewQuery =
    "select r.id, r.user_id, r.recommendation, r.longevity, r.strength, r.gender, r.fragrance, r.content, r.created_date, p.perfume_name, p.image_name, p.path, b.name  from review r, perfume p, brand b where r.perfume_id=p.id and p.brand_id=b.id and r.user_id=? order by r.created_date desc";
  try {
    const [rows] = await pool.query(getUserReviewQuery, userPkId);
    res.json(rows);
  } catch (e) {
    res.status(500).send({ ok: false, message: e });
  }
});

module.exports = router;
