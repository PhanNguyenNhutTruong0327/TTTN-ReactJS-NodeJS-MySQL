const brandShema = require('./schema');
const brandHandler = require('../../handlers/brand.handlers');

module.exports = function (fastify, opts, done) {

    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ];

    fastify.get('/api/brands', { schema: brandShema.getAllBrandSchema }, brandHandler.getAll);

    fastify.get('/api/brand/:id', { schema: brandShema.getOneBrandSchema }, brandHandler.getOne);

    fastify.get('/api/brand/list-brand-fe', { schema: brandShema.getBrandFESchema }, brandHandler.getBrandFE);

    fastify.get('/api/brand/trash/:id',{ schema: brandShema.trashBrandSchema}, brandHandler.trashBrand);

    fastify.get('/api/brand/list-trash',{schema: brandShema.getAllTrashBrandSchema}, brandHandler.getListTrash);

    fastify.get('/api/brand/rescover-trash/:id',{schema: brandShema.rescoverTrashBrandSchema}, brandHandler.rescoverTrashBrand);

    fastify.delete('/api/brand/delete/:id',{onRequest, schema: brandShema.deleteBrandSchema}, brandHandler.deleteBrand);

    fastify.get('/api/brand/display/:id',{schema: brandShema.displayBrandSchema}, brandHandler.displayBrand);
    
    fastify.post('/api/brand/create', {onRequest, schema: brandShema.createBrandSchema }, brandHandler.createBrand);

    fastify.put('/api/brand/update/:id', {onRequest, schema: brandShema.updateBrandSchema}, brandHandler.updateBrand);




    done();
};