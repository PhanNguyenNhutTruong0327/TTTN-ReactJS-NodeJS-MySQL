const discountShema = require('./schema');
const discountHandler = require('../../handlers/discounted_products.handler');

module.exports = function (fastify, opts, done) {

    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ];


    fastify.get('/api/discounted-products', { schema: discountShema.getAllDiscountedProductsSchema }, discountHandler.getAll);

    fastify.get('/api/discounted-products/:limit',{schema: discountShema.getDiscountedProWithLimitSchema}, discountHandler.getProductSaleLimit);

    fastify.get('/api/discounted-products/show/:id',{schema: discountShema.getOneDiscountedProductSchema}, discountHandler.getOne);

    fastify.post('/api/discounted-products/create',{onRequest, schema: discountShema.createDiscountedProSchema}, discountHandler.createDiscountedPro);

    fastify.get('/api/discounted-products/list-trash',{schema: discountShema.getTrashDiscountedProductsSchema}, discountHandler.getListTrash);

    fastify.put('/api/discounted-products/rescover-trash/:id',{schema: discountShema.rescoverTrashDiscountedProSchema}, discountHandler.rescoverTrash);

    fastify.put('/api/discounted-products/trash/:id',{schema: discountShema.trashDiscountedProSchema}, discountHandler.trashProSale);

    fastify.put('/api/discounted-products/display/:id',{schema: discountShema.displayDiscountedProSchema}, discountHandler.displayDiscountedPro);

    fastify.delete('/api/discounted-products/delete/:id',{onRequest,schema: discountShema.deleteDiscountedProSchema}, discountHandler.deletePro);

    fastify.put('/api/discounted-products/update/:id',{onRequest, schema: discountShema.updateDiscountedProSchema}, discountHandler.updateDiscountedPro);

    fastify.get('/api/discounted-products/get-by-id/:id',{schema: discountShema.getDiscountedProByIdSchema}, discountHandler.getById);


    done();
};