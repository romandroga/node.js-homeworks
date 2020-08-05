const fs = require("fs/promises");
const path = require("path");
const contacts = require("../db/contacts.json");
const {
  getById,
  checkRequiredFields,
  addContact,
  removeContact,
  updateContact,
} = require("../helpers");

const REQUIRED_FIELDS = ["name", "email", "phone"];
const CONPATH = path.dirname(__dirname) + "/db/contacts.json";

const contactsController = {
  get: ({ params: { id } }) => {
    const contact = getById(contacts, id);

    if (!contact) throw { status: 404, message: { message: "Not found" } };

    return { status: 200, payload: contact };
  },

  getAll: () => {
    return { status: 200, payload: contacts };
  },

  create: async (data) => {
    checkRequiredFields(data, REQUIRED_FIELDS);
    const { name, email, phone } = data;

    const contact = { id: +Date.now(), name, email, phone };

    addContact(CONPATH, contact);

    return { status: 201, payload: contact };
  },

  update: async (data) => {
    const {params: { id }, ...body} = data;
    const contactsList = JSON.parse(await fs.readFile(CONPATH, "utf8"));

    if (!getById(contactsList, id))
      throw { status: 404, message: { message: "Not found" } };
    if (!Object.keys(body).length)
      throw { status: 400, message: { message: "Missing fields" } };

    const contact = await updateContact(CONPATH, contactsList, data);

    return { status: 200, payload: contact };
  },

  delete: async ({ params: { id } }) => {
    const contactsList = JSON.parse(await fs.readFile(CONPATH, "utf8"));
    if (!getById(contactsList, id)) throw { status: 404, message: { message: "Not found" } };

    await removeContact(CONPATH, id);

    return { status: 200, payload: { message: "contact deleted" } };
  },
};

module.exports = contactsController;
