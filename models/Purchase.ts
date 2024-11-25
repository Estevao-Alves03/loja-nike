import sequelize from "@/config/database";
import { DataTypes } from "sequelize";
import product from "./Products";
import users from './User'

export const purchase = sequelize.define('Purchases', {
    purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW')
    },
    quantity: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'canceled'),
        defaultValue: 'pending'
    },
    shippingAddress: {
        type: DataTypes.TEXT
    },
    paymentMethod: {
        type: DataTypes.ENUM('creditCard', 'debitCard', 'payPal', 'Pix'),
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: users,
            key: 'id_user'
        }
    },
    cod_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: product,
            key: 'cod_product'
        }
    }
}, {
    tableName: 'purchases'
})

purchase.belongsTo(users, {foreignKey: 'id_user', as: 'user'})
purchase.belongsTo(product, {foreignKey: 'cod_product', as: 'product'})

