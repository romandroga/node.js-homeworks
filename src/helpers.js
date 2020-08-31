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

module.exports = {
  makeCall,
  throwAnswer,
  storage,
  upload,
};
