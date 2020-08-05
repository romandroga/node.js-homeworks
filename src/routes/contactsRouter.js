const { Router } = require("express");
const  contactsController  = require("../controllers/contactsController");
const { makeCall } = require("../helpers");

const contactsRouter = Router();

contactsRouter.get("/get", (req, res) =>
    makeCall(req, res, contactsController.getAll)
);
contactsRouter.get("/get/:id", (req, res) =>
  makeCall(req, res, contactsController.get)
);
contactsRouter.post("/contacts", (req, res) =>
  makeCall(req, res, contactsController.create)
);
contactsRouter.patch("/contacts/:id", (req, res) =>
  makeCall(req, res, contactsController.update)
);
contactsRouter.delete("/contacts/:id", (req, res) =>
  makeCall(req, res, contactsController.delete)
);

module.exports = contactsRouter;
