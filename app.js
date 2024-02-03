const yargs = require("yargs");
const db = require("./guestdb");
const fs = require("fs");

// console.log(process.argv);
yargs.version("1.1.2");

//Add
yargs.command({
  command: "add",
  describe: "add a guest",
  builder: {
    name: {
      describe: "Guest's Name.",
      demandOption: true,
      type: "string",
    },
    address: {
      describe: "Guest's Address",
      demandOption: true,
      type: "string",
    },
    contact: {
      describe: "Mobile number",
      demandOption: true,
      type: "number",
    },
    date: {
      describe: "Arrival date",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    db.addGuest(argv.name, argv.address, argv.contact, argv.date);
  },
});

//Update
yargs.command({
  command: "update",
  describe: "update a guest",
  builder: {
    id: {
      describe: "ID",
      demandOption: true,
      type: "number",
    },
    name: {
      describe: "Name",
      type: "string",
    },
    address: {
      describe: "Guest's Address",
      type: "string",
    },
    contact: {
      describe: "Mobile number",
      type: "number",
    },
    date: {
      describe: "Arrival date",
      type: "string",
    },
  },
  handler(argv) {
    db.updateGuest(argv.id, argv.name, argv.address, argv.contact, argv.date);
  },
});

//Delete
yargs.command({
  command: "delete",
  describe: "Delete a guest",
  builder: {
    id: {
      describe: "ID",
      demandOption: true,
      type: "number",
    },
  },
  handler: function (argv) {
    db.deleteGuest(argv.id);
  },
});

//Read
yargs.command({
  command: "read",
  describe: "Read a guest",
  builder: {
    id: {
      describe: "ID",
      demandOption: true,
      type: "number",
    },
  },
  handler: function (argv) {
    db.readGuest(argv.id);
  },
});

//List
yargs.command({
  command: "list",
  describe: "List guests",
  handler: function () {
    db.listGuest();
  },
});

yargs.parse();
// console.log(yargs.argv);
