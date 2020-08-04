const fs = require("fs");
const path = require("path");

const contactsPath = path.normalize(__dirname + "/db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    console.table(JSON.parse(data).find((contact) => contact.id === contactId));
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data).filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) throw err;
      console.log("The contact has been deleted!");
    });
    console.table(contacts);
  });
}

function addContact(name, email, phone) {
  const contact = { id: +new Date(), name, email, phone };

  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    const contacts = [...JSON.parse(data), contact];
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) throw err;
      console.log("Contact added successfully!");
    });
    console.table(contacts);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
