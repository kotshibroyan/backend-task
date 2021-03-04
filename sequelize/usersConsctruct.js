
const {  DataTypes } = require('sequelize');
const sequelize = require('../DB/dbConfig');


const User = sequelize.define('users',{
    name:{
        type: DataTypes.STRING
    },
    
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false
    },

    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    phone:{
        type: DataTypes.STRING,
        unique: true
    },

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    }

})

module.exports = User;

  