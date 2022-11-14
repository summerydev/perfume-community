require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

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

app.get("/", (req, res) => {
  //console.log(req)
  const token = req.accessToken;
  if (token !== undefined) {
    const user = decodePayload(token);
    res.send("login success", { user });
  } else {
    res.send("/");
  }
});

app.get("/", (req, res) => {
  res.send("/");
});

/** 새로고침 로그인 풀림 방지 */
app.put("/user/:id", async (req, res) => {
  const userPkId = req.params.id;
  const getUserInfoQuery = `select * from user where id=?`;
  try {
    const [result] = await pool.query(getUserInfoQuery, userPkId);
    res.json({
      user: result[0],
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ result: "fail", message: e });
  }
});

const userRouter = require("./router/users");
const reviewsRouter = require("./router/reviews");
app.use("/users", userRouter);
app.use("/reviews", reviewsRouter);

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

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
