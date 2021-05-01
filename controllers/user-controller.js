const User = require("../models/user-model");
const bcrypt = require("bcrypt");

//Sign up Controller Started
const signup = async (req, res, next) => {
  console.log("Request", req.body);
  let { userFirstName, userSecondName, userEmail, password, role } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ userEmail: userEmail });
  } catch (error) {
    res.json({
      message: "Unable to process! Please comeback after sometime",
      error,
    });
  }

  if (existingUser) {
    res.json({ message: "Email found! Please try to login" });
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = new User({
      userFirstName,
      userSecondName,
      userEmail,
      password: hashedPassword,
      role,
    });
    try {
      await user.save();
    } catch (error) {
      res.json({
        message: "Unable to process! Please comeback after sometime",
        error,
      });
    }
  }
  res.json({ message: "Signup successfull!. Please login" });
};

//Signup controller ended

//get users Started

const getUsers = async (req, res, next) => {
  let usersList;
  try {
    usersList = await User.find({}).select("-password");
  } catch (error) {
    res.json({ message: "Unable to process! Try after some time" });
  }
  res.json({
    usersList: usersList.map((user) => user.toObject({ getters: true })),
  });
};

//get Uers Ended

//Delete User  Added

const deleteUser = async (req, res, next) => {
    console.log(req);
    let id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id);
        if (deleteUser) {
            res.json({"message" : "Successfully Deleted!!!"});
        } else {
            res.json({"message": "User Not found! Please check the details once again"});
        }
    } catch(error) {
        res.json({"message" : "Unable to process! Please try after some time"});
    }
}

exports.signup = signup;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
