const mongoose = require("mongoose");
const { throwAnswer } = require("../helpers");

const auth = {
  register: async (data, { mongoDb: { userModel } }) => {
    const { email, password } = data;

    if (!email || !password) return throwErr(400, "Check required fields");

    const user = await userModel.findOne({ email });
    if (user) return throwAnswer(409, { message: "Email in use" });

    await userModel.create({
      _id: mongoose.Types.ObjectId(),
      email,
      password,
    });

    return {
      status: 200,
      user: {
        email,
        password,
      },
    };
  },

  logIn: async (data, { mongoDb: { userModel } }) => {
    const { email, password } = data;

    if (!email || !password)
      return throwAnswer(401, "Email or password is wrong.");

    const user = await userModel.findOne({ email });
    if (!user) return throwAnswer(401, "Email or password is wrong.");

    const isValid = await user.comparePassword(password.toString());
    if (!isValid) return throwAnswer(401, "Email or password is wrong.");

    const token = await user.generateToken();
    const userWithToken = await userModel.findOneAndUpdate(
      { _id: user._id },
      { token },
      { new: true }
    );

    return {
      status: 200,
      userWithToken,
    };
  },

  logOut: async (data, { mongoDb: { userModel } }) => {
    const token = data.params.authorization;


    const user = await userModel.findOne({ token });

    if (!user) {
      throwAnswer(401, { message: "Not authorized" });
    }
    await userModel.findOneAndUpdate(
      { token },
      {
        token: null,
      }
    );

    return {
      status: 204,
    };
  },
};

module.exports = auth;
