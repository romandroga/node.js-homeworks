const fs = require("fs/promises");

const makeCall = async (req, res, func) => {
  try {
    const data = req.method === "GET" ? req.query : req.body;
    data.params = req.params;

    const result = await func(data);
    const { status, payload } = result;

    res.status(status).send(payload);
  } catch (err) {
    console.log(err);
    const { status, message } = err;
    res.status(status).send(message);
  }
};

const getById = (data, id) => {
  return data.find((contact) => contact.id === +id);
};

const isUndefined = (value) => value === undefined;

const checkRequiredFields = (obj, fields) => {
  fields.map((key) => {
    if (isUndefined(obj[key]))
      throw {
        status: 400,
        message: { Message: "Missing required name field" },
      };
  });
};

const addContact = async (path, contact) => {
  try {
    const contactsList = await fs.readFile(path, "utf8");
    const updatedContactList = [...JSON.parse(contactsList), contact];
    await fs.writeFile(path, JSON.stringify(updatedContactList));
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (path, id) => {
  try {
    const contactsList = JSON.parse(await fs.readFile(path, "utf8"));
    const updatedContactList = contactsList.filter((contact) => {
      return contact.id !== +id;
    });
    await fs.writeFile(path, JSON.stringify(updatedContactList));
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (path, contacts, data) => {
  try {
    const {params: { id }, ...body} = data;

    const updatedContacts = contacts.map((contact) =>
      contact.id === +id ? { ...contact, ...body } : contact
    );

    const contact = updatedContacts.find((contact) => contact.id === +id);

    await fs.writeFile(path, JSON.stringify(updatedContacts));

    return contact;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  makeCall,
  getById,
  isUndefined,
  checkRequiredFields,
  addContact,
  removeContact,
  updateContact,
};
