// this file defines the ORM structures of all the tables from the database
// and the functions for making queries
const Sequelize = require('sequelize');
require('dotenv').config();
const db = require('./db');

// insert and lookup section
module.exports = {
  insertPatient: function(usr, psw, email) {
    db.models.Patient.create({
      username: usr,
      password: psw,
      paEmail: email,
    }).then(() => {
      console.log('Patient ' + usr + ' inserted');
    });
  },
  insertDoctor: function(usr, psw, email) {
    db.models.Doctor.create({
      username: usr,
      password: psw,
      docEmail: email,
    }).then(() => {
      console.log('Doctor ' + usr + ' inserted');
    });
  },
  loginPatient: function(usr, psw) {
    return db.models.Patient.findOne({
      where: {
        username: usr,
        password: psw,
      },
    }).then(patient => {
      return patient;
    });
  },
  loginDoctor: function(usr, psw) {
    return db.models.Doctor.findOne({
      where: {
        username: usr,
        password: psw,
      },
    }).then(doctor => {
      return doctor;
    });
  },
};
