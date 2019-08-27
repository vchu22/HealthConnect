const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('../index');

const saltRounds = 10;

const Doctor = db.define('Doctor', {
  docId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  docFname: Sequelize.STRING(40),
  docLname: Sequelize.STRING(40),
  docLicense: Sequelize.STRING(10),
  docStreet: Sequelize.STRING(100),
  docCity: Sequelize.STRING(40),
  docState: Sequelize.CHAR(2),
  docZip: Sequelize.CHAR(5),
  docPhone: Sequelize.CHAR(10),
  docRating: Sequelize.DECIMAL(2, 1),
  docEmail: Sequelize.STRING(255),
  username: Sequelize.STRING(50),
  password: Sequelize.STRING(120),
});

module.exports = Doctor;

/**
 * hooks
 */
const hashPassword = doctor => {
  return bcrypt
    .hash(doctor.password, saltRounds)
    .then(hash => {
      doctor.password = hash;
    })
    .catch(err => {
      throw new Error();
    });
};

Doctor.beforeCreate(hashPassword);
Doctor.beforeUpdate(hashPassword);
Doctor.beforeBulkCreate(doctors => {
  doctors.forEach(hashPassword);
});
