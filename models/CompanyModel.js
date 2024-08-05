import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Companies = db.define('company', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [0, 20]
        }
    },
    interactionDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [0, 100]
        }
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Transferencia', 'Efectivo', 'Deposito']],
            notEmpty: true
        }
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [0, 100]
        }
    },
    prospects: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [0, 100]
        }
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

Users.hasMany(Companies);
Companies.belongsTo(Users, { foreignKey: 'userId' });

export default Companies;
