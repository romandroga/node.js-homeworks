const file = {
  upload: async (req, res) => {
    const {
      file: { originalname },
    } = req;
    try {
      const uploadImage = await cloudinary.uploader.upload(
        __dirname + "/../static/images/" + originalname
      );
      console.log({ uploadImage });
    } catch (error) {
      console.log(error);
    }
    res.send("Ok");
  },
};

module.exports = file;
