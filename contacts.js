const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const result = allContacts.find((item) => item.id === contactId);
    return result || null;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateById = async (id, data) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    allContacts[index] = { id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return allContacts[index];
  } catch (error) {
    console.log(error);
  }
};

const removeById = async (id) => {
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateById,
  removeById,
};
