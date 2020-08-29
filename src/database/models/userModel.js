const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const { JWT_SECRET_TOKEN } = process.env;

const userSchema = new Schema({
  login: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
  token: {
    type: mongoose.Schema.Types.String,
    default: null,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(3);
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = function () {
  const user = this;

  return jwt.sign({ _id: user._id }, JWT_SECRET_TOKEN);
};

userSchema.methods.isValidToken = function (token) {
  try {
    jwt.verify(token, JWT_SECRET_TOKEN);
  } catch (err) {
    return false;
  }

  return true;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
