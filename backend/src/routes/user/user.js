const userShema = require('./schema');
const userHandler = require('../../handlers/user.handler');

module.exports = function (fastify, opts, done) {

    const onRequest = [
        async (request, reply) => await fastify.authenticate(request, reply),
    ];


    fastify.get('/api/users', { schema: userShema.getAllUserSchema }, userHandler.getAll);

    fastify.get('/api/user/show/:id', { schema: userShema.getOneUserSchema }, userHandler.getOne);

    fastify.post('/api/user/create', { schema: userShema.createUserSchema }, userHandler.createUser);

    fastify.put('/api/user/update/:id', {onRequest, schema: userShema.updateUserSchema }, userHandler.updateUser);

    fastify.put('/api/user/trash/:id', { schema: userShema.trashUserSchema }, userHandler.trashUser);

    fastify.put('/api/user/rescover-trash/:id', { schema: userShema.rescoverTrashUserSchema }, userHandler.rescoverTrashUser);

    fastify.get('/api/user/list-trash', { schema: userShema.getAllTrashUserSchema }, userHandler.getListTrash);

    fastify.put('/api/user/display/:id', { schema: userShema.displayUserSchema }, userHandler.displayUser);

    fastify.delete('/api/user/delete/:id', {onRequest, schema: userShema.deleteUserSchema }, userHandler.deleteUser);

    fastify.post('/api/user/check-login',{schema: userShema.checkLoginSchema}, userHandler.checkLogin);

    // fastify.put('/api/user/customer/updata-password/:id', {schema: userShema.updatePasswordCustomerSchema}, userHandler.updateUserPassword);

    // fastify.post('/api/user/forgot-password',{ schema: userShema.forgotPasswordSchema}, userHandler.forgotPassword);


    done();
};