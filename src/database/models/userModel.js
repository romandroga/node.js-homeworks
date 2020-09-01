const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
const { HOST, JWT_SECRET_TOKEN } = process.env;

const userSchema = new Schema({
  email: {
    type: Schema.Types.String,
    validate: {
      validator: (email) => email.indexOf("@") > -1,
      message: "Invalid email format",
    },
  },
  password: Schema.Types.String,
  verificationToken: { type: Schema.Types.String, default: null },
  avatarURL: {
    type: Schema.Types.String,
    default: `${HOST}/images/avatar.png`,
  },
  subscription: {
    type: Schema.Types.String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: { type: Schema.Types.String, default: null },
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
