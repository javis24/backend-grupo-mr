import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const BusinessUnits = db.define('business_unit', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    unitName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['Unidades servicio', 'Tarimas', 'Empaques', 'Alimentos', 'Sano', 'Composta', 'Plastico']]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    sales: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Users.hasMany(BusinessUnits);
BusinessUnits.belongsTo(Users, { foreignKey: 'userId' });

export default BusinessUnits;
