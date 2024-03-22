import { Sequelize } from 'sequelize';
import { database, dialect, host, password, user } from '../constants.js';
import UserModel from '../model/User.js';
import mysql2 from 'mysql2';
const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: dialect,
  dialectModule: mysql2, 
});


// Define models
const models = {
  Roles: UserModel,
};

// Sync all models with the database
const syncModels = async () => {
  try {
    // Authenticate the Sequelize instance
    await sequelize.authenticate();

    // Synchronize all models with the database
    for (const model of Object.values(models)) {
      await model.sync();
    }

    console.log('Models synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { syncModels };
