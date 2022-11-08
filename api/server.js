require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const { makeToken, decodePayload } = require("./util/jwt.js");

/** DB pool */
const pool = require("./db/db.js");

/** cookie parser */
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

/** body parser */
const bodyParser = require("body-parser");
app.use(bodyParser.json());

/** cors */
var cors = require("cors");
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

/** jwt */
const jwt = require("jsonwebtoken");

/** apis */
app.get("/", (req, res) => {
  res.send("Hello World!");
  const token = req.cookies.jwt;
  if (token !== undefined) {
    const user = decodePayload(token);
    res.render("/", { user });
  } else {
    res.render("/");
  }
});

/** 유저 로그인 */
app.put("/users/login", async (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;

  try {
    const userQuery = `select * from user where user_id=? and password=?`;
    const [result] = await pool.query(userQuery, [userid, password]);
    console.log(result[0]);
    if (result.length > 0) {
      const accessToken = makeToken({ userid: result[0].user_id });
      console.log(accessToken);
      res.cookie("jwt", accessToken);
      res.status(200).send({
        result,
        token: { accessToken },
      });
    } else {
      res.send("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  } catch (e) {
    console.log(e);
    res.send(null);
  }
});

/** 유저 회원가입 */
app.post("/users", async (req, res) => {
  const query = `insert into user (user_id, password, name, email, phone, created_date, role_id) values (?,?,?,?,?,now(),1)`;
  try {
    const [rows] = pool.query(query, [
      req.body.userid,
      req.body.password,
      req.body.name,
      req.body.email,
      req.body.phone,
    ]);
    res.json(rows);
  } catch (e) {
    console.log(e);
  }
});

/** [리뷰] 전체 리뷰 리스트 조회 */
app.get("/reviews", async (req, res) => {
  const query = "select * from review";

  try {
    const [rows] = await pool.query(query);
    res.json(rows);
    return rows;
  } catch (e) {
    console.log("DB err");
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
