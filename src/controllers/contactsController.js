const contactsController = {
  get: async ({ params: { id } }, { mongoDB: { contactModel } }) => {
    try {
      const contact = await contactModel.findById(id);

      return { status: 200, payload: contact };
    } catch (e) {
      console.log(e);
      throw { status: 404, message: { message: "Not found" } };
    }
  },

  getAll: async (_, { mongoDB }) => {
    try {
      const { contactModel } = mongoDB;

      const contacts = await contactModel.find();

      return { status: 200, payload: contacts };
    } catch (e) {
      console.log(e);
    }
  },

  create: async (data, { mongoDB: { contactModel } }) => {
    try {
      const contact = await contactModel.create(data);

      return { status: 201, payload: contact };
    } catch (e) {
      console.log(e);
    }
  },

  update: async (data, { mongoDB: { contactModel } }) => {
    try {
      const {
        params: { id: _id },
        ...body
      } = data;

      const contact = await contactModel.findOneAndUpdate({ _id }, body, {
        new: true,
      });

      return { status: 200, payload: contact };
    } catch (e) {
      console.log(e);
      throw { status: 404, message: { message: "Not found" } };
    }
  },

  delete: async ({ params: { id: _id } }, { mongoDB: { contactModel } }) => {
    try {
      await contactModel.deleteOne({ _id });

      return { status: 200, payload: { message: "contact deleted" } };
    } catch (e) {
      console.log(e);
      throw { status: 404, message: { message: "Not found" } };
    }
  },
};

module.exports = contactsController;
