const postShema = require('./schema');
const postHandler = require('../../handlers/post.handler');

module.exports = function (fastify, opts, done) {

    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ];


    fastify.get('/api/post/new', { schema: postShema.getPostNewSchema }, postHandler.getPostNew);

    fastify.get('/api/post/get-by-type/:type', { schema: postShema.getAllPostByTypeSchema }, postHandler.getAllPostByType);

    fastify.get('/api/post/show/:id', { schema: postShema.getOnePostSchema }, postHandler.getOne);

    fastify.put('/api/post/trash/:id', { schema: postShema.trashPostSchema }, postHandler.trashPost);

    fastify.put('/api/post/rescover-trash/:id', { schema: postShema.rescoverTrashPostSchema}, postHandler.rescoverTrash);

    fastify.put('/api/post/display/:id', { schema: postShema.displayPostSchema}, postHandler.displayPost);

    fastify.get('/api/post/trash/get-list-trash/:type',{schema: postShema.getListTrashPostByTypeSchema},postHandler.getListTrash);

    fastify.delete('/api/post/delete-post/:id', {onRequest, schema: postShema.deletePostSchema}, postHandler.deletePost);

    fastify.post(`/api/post/create`,{onRequest, schema: postShema.createPostSchema}, postHandler.createPost);

    fastify.get('/api/post/get-by-slug-topic/:slug',{schema: postShema.getPostBySlugTopicSchema}, postHandler.getPostBySlugTopic);

    fastify.get('/api/post/detail/:slug',{schema: postShema.getDetailPostAndOrtherSchema}, postHandler.getDeatilPostBySlugAndPostOther);

    fastify.put('/api/post/update/:id',{onRequest, schema: postShema.updatePostSchema}, postHandler.updatePost);



    done();
};