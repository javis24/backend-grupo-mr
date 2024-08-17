import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Users from './UserModel.js';

const { DataTypes } = Sequelize;

const Event = db.define('event', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: DataTypes.DATEONLY, 
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  timeOfDay: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Mañana', 'Tarde']],
      notEmpty: true,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  freezeTableName: true,
});

Users.hasMany(Event);
Event.belongsTo(Users, { foreignKey: 'userId' });

export default Event;
