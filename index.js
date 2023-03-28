import contactsRep from "./contacts.js";
import { Command } from "commander";
const program = new Command();


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsRep.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const getContact = await contactsRep.getContactById(id);
      if (!getContact) {
        throw new Error("Contact doesn't exist");
      }
      console.log(getContact)
      break;

    case "add":
        const addCont = await contactsRep.addContact({name, email, phone});
        console.log(addCont);
      break;

    case "remove":
        const deleteContact = await contactsRep.removeContact(id);
        console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);