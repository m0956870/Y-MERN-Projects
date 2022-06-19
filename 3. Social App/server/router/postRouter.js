const express = require("express");
const router = express.Router();

const User = require("../model/userSchema");
const Post = require("../model/postSchema");

const verifyUser = require("../middleware/jwtAuth");

// POST
router.get("/allposts", async (req, res) => {
  try {
    const allPosts = await Post.find().sort({
      createdAt: -1,
    });
    res.status(200).json({ status: true, response: allPosts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/find/:_id", async (req, res) => {
  try {
    let post = await Post.findOne({_id: req.params._id})
    res.status(200).json({ status: true, response: post });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/allposts/:_id", async (req, res) => {
  try {
    const myPosts = await Post.find({ postedBy: req.params._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: true, response: myPosts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/followings",verifyUser, async (req, res) => {
  try {
    const allPosts = await Post.find({
      postedBy: { $in: req.user.following },
    }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: true, response: allPosts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});


router.get("/myposts",verifyUser, async (req, res) => {
  try {
    const myPosts = await Post.find({postedBy: req.user._id}).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: true, response: myPosts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});


router.post("/create-post", async (req, res) => {
  // console.log(req.body);
  try {
    const post = await Post.create(req.body);
    res.status(200).json({ status: true, response: "Success: Post created." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

// DELETE POST
router.delete("/delete/:_id", verifyUser, async (req, res) => {
  // console.log(req.params._id);
  try {
    let post = await Post.findByIdAndDelete(req.params._id);
    res
      .status(200)
      .json({ status: true, response: "Success: Post delete successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

// LIKE
router.post("/like", verifyUser, async (req, res) => {
  // console.log(req.body)
  try {
    let post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $push: { likes: req.user._id },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, response: "Success: Liked successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.post("/unlike", verifyUser, async (req, res) => {
  // console.log(req.body)
  try {
    let post = await Post.findByIdAndUpdate(
      req.body._id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, response: "Success: Unliked successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

// COMMENT
router.post("/comment/:_id", verifyUser, async (req, res) => {
  // console.log(req.body)
  try {
    let post = await Post.findByIdAndUpdate(
      req.params._id,
      {
        $push: { comments: req.body },
      },
      { new: true }
    );

    // console.log(post)

    res
      .status(200)
      .json({ status: true, response: "Success: Comment successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/uncomment/:_id", verifyUser, async (req, res) => {
  // console.log(req.params._id)
  try {
    let post = await Post.updateOne(
      { "comments._id": req.params._id },
      {
        $pull: { comments: { _id: req.params._id } },
      },
      { new: true }
    );

    // console.log(post)

    res
      .status(200)
      .json({ status: true, response: "Success: Comment successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

module.exports = router;
