const { throwAnswer } = require("../helpers");

const contact = {
  get: async (data, { mongoDb: { userModel } }) => {
    const token = data.params.authorization;

    const user = await userModel.findOne({ token });

    if (!user) {
      throwAnswer(401, { message: "Not authorized" });
    }

    return {
      status: 200,
      email: user.email,
      subscription: user.subscription,
      avatar: user.avatarURL,
    };
  },

  update: async (data, { mongoDb: { userModel } }) => {
    const token = data.params.authorization;

    const {
      email,
      subscription,
      file: { originalname },
    } = data;

    const user = await userModel.findOne({ token });

    if (!user) {
      throwAnswer(401, { message: "Not authorized" });
    }

    if (!email || !originalname || !subscription) {
      throwAnswer(400, "Missing required name field");
    }

    await userModel.findOneAndUpdate(
      { token },
      {
        email,
        subscription,
      }
    );
    return {
      status: 200,
      email,
      subscription,
    };
  },
};

module.exports = contact;
