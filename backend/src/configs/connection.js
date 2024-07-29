const mysql = require('@fastify/mysql');

const mysqlConnection = (fastify) => {
    fastify.register( mysql, {
        connectionString: 'mysql://root@localhost/fastify'
    });
}

module.exports = mysqlConnection;