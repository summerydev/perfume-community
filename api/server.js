require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const { makeToken } = require("./util/jwt.js");
const jwt = require("./util/jwt.js");
const { verify, decodePayload } = require("./util/jwt.js");

/** DB pool */
const pool = require("./db/db.js");

/** body parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** cors */
var cors = require("cors");
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

/** apis */
/**  */
// app.get("/", (req, res) => {
//   console.log(req)
//   const token = req.accessToken;
//   if (token !== undefined) {
//     const user = decodePayload(token);
//     res.send("login success", { user });
//   } else {
//     res.send("/");
//   }
// });

app.get("/", (req, res) => {
  res.send("/");
});

/** 유저 로그인 */
app.put("/users/login", async (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;

  try {
    const loginCheckQuery = `select * from user where user_id=? and password=?`;
    const [result] = await pool.query(loginCheckQuery, [userid, password]);

    if (result.length > 0) {
      const accessToken = makeToken({ userid: result[0].user_id });
      const refreshToken = jwt.refresh();

      res.json({
        result,
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
app.post("/users", async (req, res) => {
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

/** 회원 정보 관련 */
/** authJWT */
const authJWT = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1]; // header에서 access token get
    const result = verify(token); // token을 검증
    if (result.ok) {
      // token이 검증되었으면 req에 값을 세팅, 다음 콜백함수로
      req.id = result.id;
      next();
    } else {
      // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답
      res.status(401).send({
        ok: false,
        message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'
      });
    }
  }
};

app.get("/", authJWT);

/** 회원 정보 수정 */
app.put("/users", async (req, res) => {
  const userUpdatequery =
    "update user set password=?, name=?, email=?, phone=? where id=?;";
  try {
    const rows = await pool.query(userUpdatequery, [
      req.body.password,
      req.body.name,
      req.body.email,
      req.body.phone,
      req.params.id,
    ]);
    console.log(rows);
    res.status(200).send({ result: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ result: "fail", message: e });
  }
});

/** [리뷰] 전체 리뷰 리스트 조회 */
app.get("/reviews", async (req, res) => {
  const getReviewQuery =
    "select r.id, r.user_id, r.recommendation, r.longevity, r.strength, r.gender, r.fragrance, r.content, p.perfume_name, p.image_name, p.path, b.name  from review r, perfume p, brand b where r.perfume_id=p.id and p.brand_id=b.id";
  try {
    const [rows] = await pool.query(getReviewQuery);
    res.json(rows);
  } catch (e) {
    console.log(e);
    res.status(500).send({ result: "fail", message: e });
  }
});

/** 향수 검색 */
app.get("/perfume", async (req, res) => {
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

/** [리뷰] 리뷰 등록 */
app.post("/reviews", async (req, res) => {
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
    res.json({ status: 200 });
  } catch (e) {
    console.log(e);
    res.status(500).send({ result: "fail", message: e });
  }
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
