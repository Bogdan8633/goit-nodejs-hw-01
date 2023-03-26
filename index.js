const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case "updateById":
      const updateContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });
      console.log(updateContact);
      break;
    case "remove":
      const removeContact = await contacts.removeById(id);
      console.log(removeContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

//Виклик invokeAction через СLI за допомогою використання commander
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);

// Викликаємо invokeAction для різних цілей вручну (доступно 5 опцій):

//1. Отримати список всіх контактів
// invokeAction({ action: "list" });

//2. Знайти контакт за id
// invokeAction({ action: "get", id: "GimGOKP9MUS2uFZPjBE8t" });

//3. Додати новий контакт
// invokeAction({
//   action: "add",
//   name: "My Favorite Beaver Vodafone",
//   email: "beaver@gmail.com",
//   phone: "37773557424",
// });

//4. Редагувати контакт по id
// invokeAction({
//   action: "updateById",
//   id: "GimGOKP9MUS2uFZPjBE8t",
//   name: "Big Beaver Kyivstar",
//   email: "big-beaver@gmail.com",
//   phone: "777888222333",
// });

// //5. Видалити контакт по id
// invokeAction({
//   action: "remove",
//   id: "GimGOKP9MUS2uFZPjBE8t",
// });
