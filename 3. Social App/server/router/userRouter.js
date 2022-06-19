const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/userSchema");
const verifyUser = require("../middleware/jwtAuth");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

// USER Routes
router.get("/allusers", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ status: true, response: allUsers });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/details", verifyUser, async (req, res) => {
  try {
    res.status(200).json({ status: true, response: req.user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    res.status(200).json({ status: true, response: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/search/:value", async (req, res) => {
  // console.log(req.params.search);
  try {
    let users = await User.find({
      $or: [
        {
          name: { $regex: new RegExp(req.params.value) },
        },
        {
          email: { $regex: new RegExp(req.params.value) },
        },
      ],
    });

    res.status(200).json({ status: true, response: users });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

// SIGNUP & LOGIN Routes
router.post("/signup", async (req, res) => {
  const { name, email, password, date } = req.body;

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      // console.log("user exist");
      return res
        .status(400)
        .json({ status: false, response: "Error: User already exist" });
    } else {
      let hashPass = await bcrypt.hash(password, 10);

      const newUser = await new User({
        name,
        email,
        password: hashPass,
        date,
      });

      const result = await newUser.save();
      // console.log(result);
      res
        .status(200)
        .json({ status: true, response: "Success: User signup successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, response: error });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      // console.log(token);

      const cookie = res.cookie("jwt", token, {
        maxAge: new Date(new Date().getTime() + 60 * 60 * 24 * 30), // date.now()+60*60*24*30 // for month
        httpOnly: true,
      });

      let hashPass = await bcrypt.compare(password, user.password);

      if (user.email === email && hashPass) {
        res
          .status(200)
          .json({ status: true, response: "Success: User Login successfully" }); // header in small letters
      } else {
        res
          .status(400)
          .json({ status: false, response: "Error: Invalid credentials" });
      }
    } else {
      return res
        .status(400)
        .json({ status: false, response: "Error: User not found" }); // send res.json so client can receive and show res in console
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, response: error });
  }
});

// UPDATE details
router.post("/update/profilepic", async (req, res) => {
  // console.log(req.body);
  let { _id, profilePic } = req.body;
  try {
    let updateUser = await User.updateOne({ _id }, { $set: { profilePic } });
    let user = await User.findOne({ _id });
    res.status(200).json({ status: true, response: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.post("/update/account-details", async (req, res) => {
  // console.log(req.body);
  let { _id } = req.body;
  try {
    let updateUser = await User.updateOne({ _id }, { $set: req.body });
    let user = await User.findOne({ _id });
    res.status(200).json({ status: true, response: user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.post("/update/password", async (req, res) => {
  // console.log(req.body);
  let { _id, password } = req.body;
  try {
    let hashPass = await bcrypt.hash(password, 10);
    let updateUser = await User.updateOne(
      { _id },
      { $set: { password: hashPass } }
    );
    res.status(200).json({
      status: true,
      response: "Success: Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

// Password Routes
router.post("/password/forget", async (req, res) => {
  // console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ status: false, response: "Error: User Not Found!" });
    }

    const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    const cookie = res.cookie("resetPassword", token, {
      maxAge: Date.now() + 60 * 10,
      httpOnly: true,
    });

    // transporter.sendMail(
    //   {
    //     from: "no-reply@gmail.com",
    //     to: user.email,
    //     subject: "Change Password",
    //     html: `<a href="http://localhost:3000/password/reset">Reset password</a>`,
    //   },
    //   (err, info) => {
    //     if (err) {
    //       return console.log(err);
    //     }
    //   }
    // );
    res
      .status(200)
      .json({ status: true, response: "Success: Check your email!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.post("/password/reset", async (req, res) => {
  // console.log(req.body);
  try {
    let token = req.cookies.resetPassword;
    if (!token) {
      return res
        .status(400)
        .json({ status: false, response: "Error: Link expired!" });
    }
    let verified = await jwt.verify(token, process.env.SECRET_KEY);

    let verifiedUser = await User.findOne({ _id: verified.id });

    let hashPass = await bcrypt.hash(req.body.password, 10);

    let user = await User.updateOne(
      { _id: verifiedUser._id },
      { $set: { password: hashPass } }
    );

    res.status(200).json({
      status: true,
      response: "Success: Password updated successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

// Follow
router.get("/follow/:_id", verifyUser, async (req, res) => {
  // console.log(req.params._id);
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { following: req.params._id },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.params._id,
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    );

    let myInfo = await User.findOne({ _id: req.user._id });

    res.status(200).json({ status: true, response: myInfo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.get("/unfollow/:_id", verifyUser, async (req, res) => {
  // console.log(req.params._id);
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.params._id },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.params._id,
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    );

    let myInfo = await User.findOne({ _id: req.user._id });

    res.status(200).json({ status: true, response: myInfo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

router.post("/delete", async (req, res) => {
  // console.log(req.body);
  let { _id } = req.body;
  try {
    let user = await User.deleteOne({ _id });
    res
      .status(200)
      .json({ status: true, response: "Success: User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, response: error });
  }
});

module.exports = router;
