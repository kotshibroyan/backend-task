const { Sequelize } = require('sequelize');

//'database', 'username', 'password'--'postgres', 'postgres', 'postgres'

const sequelize = new Sequelize( 'postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});


module.exports = sequelize;