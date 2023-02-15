const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const db = new Map();
const contactsRepo = require('./contactsRepo');

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname , '../data/contact.json'));
    const contactArray = JSON.parse(jsonData);
    contactArray.forEach(element => {
        db.set(element[0], element[1])
    });
};

const saveData = () => {
    const stringifyData  = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname , '../data/contact.json'), stringifyData);
};