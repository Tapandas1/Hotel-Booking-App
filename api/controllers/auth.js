const User = require("../models/User");
const bcrypt=require("bcryptjs");
const createError = require("../utils/error");
const jwt=require("jsonwebtoken")
const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created .");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
    try {
      const user=await User.findOne({username:req.body.username})
      if(!user) return next(createError(404,"User not Found!"))

      const isPassword=await bcrypt.compare(req.body.password,user.password)
      if(!isPassword) 
        return next(createError(400,"Wrong Password or Username!"))
      const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY)

      const {password,isAdmin,...otherDetails}=user._doc //because some details extra were coming if doubt remove _doc and see

      res.cookie("access_token",token,{
        httpOnly:true
      }).status(200).json({details:{...otherDetails},isAdmin});
    } catch (err) {
      next(err);
    }
  };

module.exports = { register,login };
