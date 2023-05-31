const express = require("express");
const router = express.Router();
const userDB = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

router.post("/registration", async (req, res) => {
  async function getHashedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  const newUserData = new userDB({
    userName: req.body.userName,
    password: await getHashedPassword(req.body.password),
    mobileNo: req.body.mobileNo,
    email: req.body.email,
  });

  try {
    const postedData = await newUserData.save();
    res.send(postedData);
  } catch (err) {
    res.send({ message: err });
  }
});

router.get("/login", async (req, res) => {
  try {
    var userData = await userDB.findOne({ email: req.body.email });

    bcrypt.compare(req.body.password, userData.password, function (err, data) {
      if (err) {
        throw err;
      }

      // if (data) {
      //   userData = userData.toObject();
      //   delete userData.password;

      //   // we can use this way to delete password from users data
      //   // userData.password = undefined;

      //   res.send(userData);
      // }

      if (data) {
        jwt.sign({ userData }, secretKey, { expiresIn: "1h" }, (err, token) => {
          res.json({
            token,
          });
        });
      } else {
        // response is OutgoingMessage object that server response http request
        return res.json({ message: "passwords do not match" });
      }
    });
  } catch (err) {
    res.send({ message: err });
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    console.log('bearer',bearer);

    req.token = token;
    next();
  } else {
    res.send({ result: "Token not valid" });
  }
}

router.post("/profile", verifyToken, (req, res) => {

  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      // console.log(authData.userData);
      res.json({ message: "profile accessed", authData });
    }
  });
});

module.exports = router;
