import { promises as fs } from "fs";
import { resolve } from "path";
import { nanoid } from "nanoid";

const contactsPath = resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    throw new Error("The contact is not found");
  }
  const newContacts = contacts.filter((_, index) => index !== index);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return `Contact was successfully deleted!`;
}


async function addContact({name, email, phone}) {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));;
  return newContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};