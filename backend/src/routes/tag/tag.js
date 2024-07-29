const tagShema = require('./schema');
const tagHandler = require('../../handlers/tag.handler');

module.exports = function (fastify, opts, done) {

    fastify.get('/api/tag', { schema: tagShema.getTagCategorySchema }, tagHandler.getTagCategory);

    fastify.get('/api/tags',{schema: tagShema.getAllTagSchema}, tagHandler.getAll);

    fastify.get('/api/tag/get-tag-and-category',{schema: tagShema.getTagAndCategorySchema}, tagHandler.getTagAndCategory);

    done();
};