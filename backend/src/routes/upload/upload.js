const uploadHandler = require('../../handlers/upload.handler');
const uploadSchema = require('./schema');

module.exports = function(fastify,opts, done){

    fastify.post('/api/upload', {schema: uploadSchema.uploadFileSchema} ,uploadHandler.uploadFile);

    fastify.post('/api/upload/files',{schema: uploadSchema.uploadFilesSchema}, uploadHandler.uploadFiles); // nhieu file

    done();
}