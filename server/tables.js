// this file defines the ORM structures of all the tables from the database
// and the functions for making queries
const Sequelize = require('sequelize');
require('dotenv').config();

// connect to the database
var sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// table definitions section
var Clients = sequelize.define('Clients', {
  clId: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  clFname: Sequelize.STRING(40),
  clLname: Sequelize.STRING(40),
  clSex: Sequelize.CHAR(1),
  clStreet: Sequelize.STRING(100),
  clCity: Sequelize.STRING(40),
  clState: Sequelize.CHAR(2),
  clZip: Sequelize.CHAR(5),
  clPhone: Sequelize.CHAR(10),
  clDOB: Sequelize.DATEONLY,
  insId: Sequelize.CHAR(1),
  username: Sequelize.STRING(50),
  password: Sequelize.STRING(120),
  clEmail: Sequelize.STRING(100)
});
Clients
  .sync()
  .then(function(){
    console.log("Clients table loaded");
  });
// Doctors tables
var Doctors = sequelize.define('Doctors', {
  docId: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  docFname: Sequelize.STRING(40),
  docLname: Sequelize.STRING(40),
  docLicense: Sequelize.STRING(10),
  docStreet: Sequelize.STRING(100),
  docCity: Sequelize.STRING(40),
  docState: Sequelize.CHAR(2),
  docZip: Sequelize.CHAR(5),
  docPhone: Sequelize.CHAR(10),
  docRating: Sequelize.DECIMAL(2,1),
  username: Sequelize.STRING(50),
  password: Sequelize.STRING(120),
  docEmail: Sequelize.STRING(100)
})
Doctors
  .sync()
  .then(function(){
    console.log("Doctors table loaded");
  });

// insert and lookup section
module.exports = {
  insertClient: function(usr, psw, email){
    Clients.create({
      username: usr,
      password: psw,
      clEmail: email
    }).then(function(){
      console.log("Client"+usr+" inserted");
    })
  },
  insertDoctor: function(usr, psw, email){
    Doctors.create({
      username: usr,
      password: psw,
      docEmail: email
    }).then(function(){
      console.log("Doctor "+usr+" inserted");
    })
  },
  loginClient: function(usr, psw){
    return Clients.findOne({
      where: {
        username: usr,
        password: psw
      }
    }).then((client) => {
      return client;
    });
  },
  loginDoctor: function(usr, psw){
    return Doctors.findOne({
      where: {
        username: usr,
        password: psw
      }
    }).then((doctor) => {
        return;
    });
  }
};
