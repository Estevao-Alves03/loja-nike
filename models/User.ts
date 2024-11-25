import sequelize from "@/config/database";
import { DataTypes } from "sequelize";

const users = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth: {
        type: DataTypes.DATE,
        allowNull: true
    },
    cpf: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: [11, 14]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name_street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'users'
})

export default users
