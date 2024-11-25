import sequelize from "@/config/database";
import { DataTypes } from "sequelize";

const product = sequelize.define('Product', {
    cod_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name_product: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'products'
})

export default product