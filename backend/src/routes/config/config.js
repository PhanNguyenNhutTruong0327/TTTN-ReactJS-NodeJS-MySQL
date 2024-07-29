const configShema = require('./schema');
const configHandler = require('../../handlers/config.handler');

module.exports = function (fastify, opts, done) {

    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ];


    fastify.get('/api/config', { schema: configShema.getConfigSchema  }, configHandler.getConfig );

    fastify.get('/api/config/show/:id', { schema: configShema.getOneConfigSchema}, configHandler.getOne);

    fastify.put('/api/config/update/:id',{onRequest, schema: configShema.updateConfigSchema}, configHandler.updateConfig);



    done();
};