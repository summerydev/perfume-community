require("dotenv").config();
const redisClient = require("redis");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;
const algorithm = process.env.JWT_ALG;
const expiresIn = process.env.JWT_EXP;

const option = { algorithm, expiresIn };


module.exports = {
  makeToken: (payload) => {
    return jwt.sign(payload, secretKey, option);
  },
  decodePayload: (token) => {
    return jwt.verify(token, secretKey);
  },

  refresh: () => {
    return jwt.sign({}, secretKey, {
      algorithm: "HS256",
      expiresIn: "14d",
    });
  },
  refreshVerify: async (token, userid) => {
    const getAsync = promisify(redisClient.get).bind(redisClient);
    try {
      const data = await getAsync(userid);
      if (token === data) {
        try {
          jwt.verify(token, secretKey);
          return true;
        } catch (e) {
          return false;
        }
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  },
};
