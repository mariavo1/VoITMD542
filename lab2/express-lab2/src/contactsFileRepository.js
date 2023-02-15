const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const db = new Map();
const contactsRepo = require('./contactsRepo');

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname , '../data/contact.json'));
    const contactArray = JSON.parse(jsonData);
    contactArray.forEach(element => {
        const aContact = new Contact(element[1].id, element[1].firstName, element[1].lastName, element[1].email, element[1].notes,element[1].date);
        db.set(aContact.id, aContact);
    });
};

const saveData = () => {
    const stringifyData  = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname , '../data/contact.json'), stringifyData);
};

const repo = {
    findAll : () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid), 
    create: (contact) => {
        contact.id = crypto.randomUUID();
        contact.date = new Date();
        db.set(contact.id, contact);
        saveData();
    },
    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (contact) => {
        contact.date = new Date();
        db.set(contact.id, contact)
        saveData();
    },
};

loadData();

module.exports = repo;