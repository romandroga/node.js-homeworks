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

module.exports = {
  makeCall,
};
