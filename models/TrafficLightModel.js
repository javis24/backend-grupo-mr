import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const TrafficLight = db.define('traffic_light', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['red', 'yellow', 'green']]
        }
    },
    lastScanned: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true
});

export default TrafficLight;
