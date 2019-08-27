const Sequelize = require('sequelize');

const databaseName =
  process.env.DB_SCHEMA + (process.env.NODE_ENV === 'test' ? '-test' : '');

const db = new Sequelize(
  databaseName,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    define: {
      timestamps: false,
    },
  }
);

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    require('./models');
    db.sync();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close());
}
