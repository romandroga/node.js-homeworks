const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  name: Schema.Types.String,
  email: Schema.Types.String,
  phone: Schema.Types.String,
  subscription: Schema.Types.String,
  password: Schema.Types.String,
  token: Schema.Types.String,
});

const contactModel = mongoose.model("contact", contactSchema);

module.exports = contactModel;
