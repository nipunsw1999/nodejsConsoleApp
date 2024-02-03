const ch = require("chalk");
const fs = require("fs");

const db_file = "data.json";

const addGuest = (name, address, contact, date) => {
  const guests = loadGuest();
  const length = guests.length;
  let id = 1;

  if (length > 0) {
    id = guests[length - 1].id + 1;
  }

  guests.push({
    id,
    name,
    address,
    contact,
    date,
  });

  saveGuest(guests);
  console.log(ch.green("Data saved!"));
};
const updateGuest = (id, name, address, contact, date) => {
  const guests = loadGuest();
  const guestIndex = guests.findIndex((guest) => {
    return guest.id == id;
  });
  if (guestIndex != -1) {
    const guest = guests[guestIndex];
    guest.name = name ? name : guest.name;
    guest.address = address ? name : guest.address;
    guest.contact = contact ? name : guest.contact;
    guest.date = date ? name : guest.date;

    console.log(ch.yellow("Record Update ", id));
    saveGuest(guests);
  } else {
    console.log(ch.red.inverse("No record found!"));
  }
  console.log(ch.yellow("Update"), id);
};
const deleteGuest = (id) => {
  const guests = loadGuest();
  const newGuests = guests.filter((guest) => {
    return guest.id != id;
  });
  if (guests.length > newGuests.length) {
    saveGuest(newGuests);
    console.log(ch.red("Delete"), id);
  } else {
    console.log(ch.red.inverse("No record found!"));
  }
};
const readGuest = (id) => {
  const guests = loadGuest();
  const guest = guests.find((guest) => {
    return guest.id === id;
  });
  if (guest) {
    console.log(ch.blue("Guest", id));
    console.log(guest);
  } else {
    console.log(ch.yellow.inverse("No record found!"));
  }
};
const listGuest = () => {
  console.log(ch.blue("ReListad"));
  const guests = loadGuest();
  guests.forEach((guest) => {
    console.log(guest);
  });
};

const saveGuest = (guests) => {
  const dataJSON = JSON.stringify(guests);
  fs.writeFileSync(db_file, dataJSON);
};

const loadGuest = () => {
  try {
    const dataBaffer = fs.readFileSync(db_file);
    const dataJSON = dataBaffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (e) {
    return [];
  }
};

module.exports = {
  addGuest,
  updateGuest,
  deleteGuest,
  readGuest,
  listGuest,
};
