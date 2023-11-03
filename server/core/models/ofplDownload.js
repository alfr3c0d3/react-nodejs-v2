// models/ofplDownloadModel.js
import { DataTypes, fn } from 'sequelize';

 const ofplDownload = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ofplDownloadId'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sizeKb: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.BLOB, // Use DataTypes.BLOB for byte array
    allowNull: false,
  },
  effectiveDtUtc: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'EffectiveDtUTC'
  },
  expirationDtUtc: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'ExpirationDtUTC'
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'CreatedBy'
  },
  parameters: {
    type: DataTypes.STRING
  },
  creationDtUtc: {
    type: DataTypes.DATE,
    defaultValue: fn('getdate'),
    field: 'CreationDtUTC'
  },
}

export default ofplDownload;