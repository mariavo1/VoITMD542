const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const db = new Map();

const loadData = () => {
    const fileData = fs.readFileSync(path.join(__dirname, '../data/contact.json'));
    const contactsArray = JSON.parse(fileData);
    contactsArray.forEach(element => {
        db.set(element[0], element[1]);
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
        const newContact = {
            id: crypto.randomUUID(),
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            notes: contact.notes,
            creation: Date(),
            modified: Date(),
    };

        db.set(newContact.id, newContact);
        saveData();
},

    deleteById: (uuid) => {
        db.delete(uuid);
        saveData();
    },
    update: (contact) => {
        db.set(contact.id, contact)
        saveData();
    },
};

loadData();

module.exports = repo;