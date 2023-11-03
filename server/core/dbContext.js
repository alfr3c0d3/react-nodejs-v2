import { Sequelize } from 'sequelize';
import { DbServers, ENV } from '../utils/constants.js';
import ofplDownload from './models/ofplDownload.js';
import 'dotenv/config';

const { DB_USER, DB_PASSWORD } = process.env;

class DbContext {
  constructor(dbName) {
    this._dbName = dbName;
    this.setEnvironment(ENV.DEV); // Default Environment to DEV
  }

  setEnvironment = async (newEnv) => {
    if (this._dbEnv === newEnv)
      return;

    if (this._sequelize) {
      await this._sequelize.close();
    }

    this._dbEnv = newEnv;

    this._sequelize = new Sequelize({
      host: DbServers[this._dbEnv],
      database: this._dbName,
      username: DB_USER,
      password: DB_PASSWORD,
      dialect: 'mssql',
      dialectOptions: {
        options: {
          trustServerCertificate: true,
          applicationIntent: 'ReadOnly',
          multiSubnetFailover: true,
        },
      },
    });
  }

  get ofplDownloads() {
    return this._sequelize.define('ofplDownloads', ofplDownload, {
      tableName: 'ofplDownload',
      timestamps: false,
    });;
  }
}

export default DbContext;
