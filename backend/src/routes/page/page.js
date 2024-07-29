const pageShema = require('./schema');
const pageHandler = require('../../handlers/page.handler');

module.exports = function (fastify, opts, done) {

    fastify.get('/api/page/:slug', { schema: pageShema.getPageBySlugSchema}, pageHandler.getPageBySlug);

    fastify.get('/api/pages', { schema: pageShema.getAllPageSchema}, pageHandler.getAllPage);

    // fastify.get('/api/post/show/:id', { schema: postShema.getOnePostSchema }, postHandler.getOne);

    // fastify.put('/api/post/trash/:id', { schema: postShema.trashPostSchema }, postHandler.trashPost);

    // fastify.put('/api/post/rescover-trash/:id', { schema: postShema.rescoverTrashPostSchema}, postHandler.rescoverTrash);

    // fastify.put('/api/post/display/:id', { schema: postShema.displayPostSchema}, postHandler.displayPost);

    // fastify.get('/api/post/trash/get-list-trash/:type',{schema: postShema.getListTrashPostByTypeSchema},postHandler.getListTrash);

    // fastify.delete('/api/post/delete-post/:id', {schema: postShema.deletePostSchema}, postHandler.deletePost);

    // fastify.post(`/api/post/create`,{schema: postShema.createPostSchema}, postHandler.createPost);

    // fastify.get('/api/post/get-by-slug-topic/:slug',{schema: postShema.getPostBySlugTopicSchema}, postHandler.getPostBySlugTopic);

    // fastify.get('/api/post/detail/:slug',{schema: postShema.getDetailPostAndOrtherSchema}, postHandler.getDeatilPostBySlugAndPostOther);

    // fastify.put('/api/post/update/:id',{schema: postShema.updatePostSchema}, postHandler.updatePost);



    done();
};