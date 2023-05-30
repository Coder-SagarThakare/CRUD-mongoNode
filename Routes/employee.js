const express = require("express");
const router = express.Router();
const empDB = require("../model/api");

// read data from / route
router.get("/", async (_, res) => {
  try {
    const data = await empDB.find();
    res.send(data);
  } catch (err) {
    res.send({ message: err });
  }
});

// post data
router.post("/", async (req, res) => {
  const newData = new empDB({
    empName: req.body.empName,
    techStack: req.body.techStack,
  });

  try {
    const postedData = await newData.save();
    res.send(postedData);
  } catch (err) {
    res.send({ message: err });
  }
});

// update data
router.patch("/", async (req, res) => {
  const newData = {
    empName: req.body.empName,
    techStack: req.body.techStack,
  };

  try {
    const updatedData = await empDB.updateOne(
      { empName: req.body.empName },
      { $set: { techStack: req.body.techStack } }
    );
    if (updatedData.modifiedCount > 0) res.send(updatedData);
    else res.send("data already updated");
  } catch (err) {
    res.send({ message: err });
  }
});

// delete data according to the id
router.delete("/:postId", async (req, res) => {
  try {
    const deletedData = await empDB.deleteOne({ _id: req.params.postId });
    if (deletedData.deletedCount > 0) res.send(deletedData);
    else res.send("nothing to delete ");
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
