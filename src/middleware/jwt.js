const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  const { params, mongoDb: { userModel }} = req;
  const { JWT_SECRET_TOKEN } = process.env;

  const { authorization: token } = params;

  if (!token) {
    return res.status(400).send("Token verification error: check token");
  }
  try {
    const { _id } = jwt.verify(token, JWT_SECRET_TOKEN);
      const user = await userModel.findById({ _id });

    if (!user) {
      return res.status(400).send({ message: "Not authorized" });
    }
  } catch (error) {
    return res.status(400).send("Token verification error: token is not valid");
  }

  next();
};

module.exports = { jwtMiddleware };
