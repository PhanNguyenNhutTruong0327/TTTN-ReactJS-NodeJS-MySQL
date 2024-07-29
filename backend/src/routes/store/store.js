const storeShema = require('./schema');
const storeHandler = require('../../handlers/product_store.handler');

module.exports = function (fastify, opts, done) {

    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ];

    fastify.post('/api/store/create',{onRequest, schema: storeShema.createStoreSchema}, storeHandler.createStore);

 done();   
}