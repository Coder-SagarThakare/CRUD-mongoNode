const express = require("express");
const router = express.Router();
const userDB = require("../model/user");
const bcrypt = require("bcrypt");

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

// router.get("/login", async (req, res) => {
//   try {
//     const userData = await userDB.findOne({ email: req.body.email });
//     if (!userData) {
//       res.send("User not registered");
//     } else {
//       if (userData.password == req.body.password) res.send(userData);
//       else res.send("Invalid password  !!!");
//     }
//   } catch (err) {
//     res.send({ message: err });
//   }
// });

router.get("/login", async (req, res) => {
  try {
    var userData = await userDB.findOne({ email: req.body.email });

    bcrypt.compare(req.body.password, userData.password, function (err, data) {
      if (err) {
        throw err;
      }

      if (data) {
        userData = userData.toObject();
        delete userData.password;
        // we can use this way to delete password from users data
        // userData.password = undefined;

        res.send(userData);
      } else {
        // response is OutgoingMessage object that server response http request
        return res.json({ message: "passwords do not match" });
      }
    });
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
