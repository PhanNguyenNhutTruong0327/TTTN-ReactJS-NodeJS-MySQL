const roleShema = require('./schema');
const roleHandler = require('../../handlers/role.handler');

module.exports = function (fastify, opts, done) {

    fastify.get('/api/roles', { schema: roleShema.getAllRoleSchema}, roleHandler.getAll);



    done();
}