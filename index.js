const { Command } = require("commander");
const contactsInfo = require("./contacts");
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
      const allContacts = await contactsInfo.listContacts();
      return console.table(allContacts);

    case "get":
      const getContactWithId = await contactsInfo.getContactById(id);
      return console.table(getContactWithId);

    case "add":
      const addNewContact = await contactsInfo.addContact( {
        name,
        email,
        phone,
      });
      return console.table(addNewContact);

    case "remove":
      const deleteContact = await contactsInfo.removeContact(id);
      return console.table(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
