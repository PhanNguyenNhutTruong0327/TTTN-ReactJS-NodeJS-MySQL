const bannerShema = require('./schema');
const bannerHandler = require('../../handlers/banner.handler');

module.exports = function (fastify, opts, done) {

    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ];

    fastify.get('/api/banner/:position', { schema: bannerShema.getSliderFESchema }, bannerHandler.getBannerFE );

    fastify.get('/api/banners',{schema: bannerShema.getAllBannerSchema}, bannerHandler.getAll);

    fastify.get('/api/banner/show/:id',{schema: bannerShema.getOneBannerSchema}, bannerHandler.getOne);

    fastify.post('/api/banner/create',{onRequest, schema: bannerShema.createBannerSchema}, bannerHandler.createBanner);

    fastify.put('/api/banner/update/:id',{onRequest, schema: bannerShema.updateBannerSchema}, bannerHandler.updateBanner);

    fastify.put('/api/banner/trash/:id', {schema: bannerShema.trashBannerSchema}, bannerHandler.trashBanner);
    
    fastify.put('/api/banner/rescover-trash/:id', {schema: bannerShema.rescoverTrashBannerSchema}, bannerHandler.rescoverTrashBanner);

    fastify.put('/api/banner/display/:id',{schema: bannerShema.displayBannerSchema}, bannerHandler.displayBanner);

    fastify.get('/api/banner/get-list-trash',{schema: bannerShema.getTrashBannerSchema}, bannerHandler.getListTrash);

    fastify.delete('/api/banner/delete/:id',{onRequest, schema: bannerShema.deleteBannerSchema}, bannerHandler.deleteBanner);


    done();
};