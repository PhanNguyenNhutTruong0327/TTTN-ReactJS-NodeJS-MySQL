const saleShema = require('./schema');
const saleHandler = require('../../handlers/sale.handler');

module.exports = function (fastify, opts, done) {

    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ];


    fastify.get('/api/sale', { schema: saleShema.getAllSaleSchema }, saleHandler.getAll);

    fastify.get('/api/sale/:id', {schema: saleShema.getOneSaleSchema}, saleHandler.getOne);

    fastify.post('/api/sale/create',{onRequest, schema: saleShema.createSaleSchema}, saleHandler.createSale);

    fastify.put('/api/sale/update/:id', {onRequest, schema: saleShema.updateSaleSchema}, saleHandler.updateSale);

    fastify.get('/api/sale/list-trash', {schema: saleShema.getAllTrashSaleSchema}, saleHandler.getListTrash);

    fastify.put('/api/sale/display/:id', {schema: saleShema.displaySaleSchema}, saleHandler.displaySale);

    fastify.put('/api/sale/rescover-trash/:id', {schema: saleShema.rescoverTrashSaleSchema}, saleHandler.rescoverTrashSale);

    fastify.delete('/api/sale/delete/:id', {onRequest, schema: saleShema.deleteSaleSchema}, saleHandler.deleteSale);

    fastify.put('/api/sale/trash/:id',{schema: saleShema.trashSaleSchema}, saleHandler.trashSale);

    fastify.get('/api/sale/get-all', {schema: saleShema.getAllSaleStatus1Schema}, saleHandler.getAllSale);

    done();
};