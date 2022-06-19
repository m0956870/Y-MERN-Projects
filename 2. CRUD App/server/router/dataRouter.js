const express = require("express");
const router = express.Router();

const Data = require("../model/dataSchema");

// READ
router.get("/alldata", async (req, res) => {
  try {
    let allUserData = await Data.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, response: allUserData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

// Data by id
router.get("/:_id", async (req, res) => {
  // console.log(req.params._id);
  try {
    let allData = await Data.find({ postedBy: req.params._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: true, response: allData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

// CREATE
router.post("/add", async (req, res) => {
  // console.log(req.body)
  try {
    let newData = await Data.create(req.body);
    res
      .status(200)
      .json({ status: true, response: "Success: User data created." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

// UPDATE
router.post("/edit", async (req, res) => {
  // console.log(req.body)
  try {
    let data = await Data.updateOne({ _id: req.body._id }, { $set: req.body });
    res
      .status(200)
      .json({ status: true, response: "Success: User updated successfully." });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE
router.delete("/delete/:_id", async (req, res) => {
  try {
    await Data.deleteOne({ _id: req.params._id });
    res.status(200).json({
      status: true,
      response: "Success: User data deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/delete-all/:_id", async (req, res) => {
  // console.log(req.body)
  try {
    await Data.deleteMany({ postedBy: req.params._id });
    res.status(200).json({
      status: true,
      response: "Success: All data deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

module.exports = router;
