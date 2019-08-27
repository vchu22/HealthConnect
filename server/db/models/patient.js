const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('../index');

const saltRounds = 10;

const Patient = db.define('Patient', {
  paId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  paFname: Sequelize.STRING(40),
  paLname: Sequelize.STRING(40),
  paSex: Sequelize.CHAR(1),
  paStreet: Sequelize.STRING(100),
  paCity: Sequelize.STRING(40),
  paState: Sequelize.CHAR(2),
  paZip: Sequelize.CHAR(5),
  paPhone: Sequelize.CHAR(10),
  paDOB: Sequelize.DATEONLY,
  insId: Sequelize.CHAR(1),
  paEmail: Sequelize.STRING(255),
  username: Sequelize.STRING(50),
  password: {
    type: Sequelize.STRING(120),
  },
});

module.exports = Patient;

/**
 * hooks
 */
const hashPassword = patient => {
  return bcrypt
    .hash(patient.password, saltRounds)
    .then(hash => {
      patient.password = hash;
    })
    .catch(err => {
      throw new Error();
    });
};

Patient.beforeCreate(hashPassword);
Patient.beforeUpdate(hashPassword);
Patient.beforeBulkCreate(patients => {
  patients.forEach(hashPassword);
});
