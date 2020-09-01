const multer = require("multer");

const makeCall = async (req, res, func) => {
  try {
    const data = req.method === "GET" ? req.query : req.body;
    data.params = req.params;

    const result = await func(data, { mongoDB: req.mongoDB });
    const { status, payload } = result;

    res.status(status).send(payload);
  } catch (err) {
    console.log(err);
    const { status, message } = err;
    res.status(status).send(message);
  }
};

const throwAnswer = (status, message) => {
  throw { status, message };
};

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, `${__dirname}./../../../public/images/`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, EMAIL_NAME } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const MAIL = {
  registration: {
    from: EMAIL_NAME,
    subject: "Validate email",
    text: "Validate email",
  },
};

const sendEmail = async (email, verifyURL, type) => {
  const mailOptions = {
    ...MAIL[type],
    html: `<strong>Hi, welcome to our cite. Verify you'r email: <a target="_blank" href='${verifyURL}'>Clik link</a></strong>`,
    to: email,
  };
  try {
    await sgMail.send(mailOptions);
  } catch (error) {
    return fasle;
  }
};

module.exports = {
  makeCall,
  throwAnswer,
  storage,
  upload,
  sendEmail,
};
