const customerShema = require('./schema');
const customerHandler = require('../../handlers/customer.handler');

module.exports = function (fastify, opts, done) {

    fastify.get('/api/customers', { schema: customerShema.getAllCustomerSchema }, customerHandler.getAll);

    fastify.get('/api/customer/show/:id', { schema: customerShema.getOneCustomerSchema }, customerHandler.getOne);

    fastify.post('/api/customer/create', { schema: customerShema.createCustomerSchema}, customerHandler.createCustomer);

    fastify.put('/api/customer/update/:id', { schema: customerShema.updateCustomerSchema}, customerHandler.updateCustomer);

    fastify.put('/api/customer/trash/:id', { schema: customerShema.trashCustomerSchema}, customerHandler.trashCustomer);

    fastify.put('/api/customer/rescover-trash/:id', { schema: customerShema.rescoverTrashCustomerSchema}, customerHandler.rescoverTrashCustomer);

    fastify.get('/api/customer/list-trash', { schema: customerShema.getAllTrashCustomerSchema}, customerHandler.getListTrash);

    fastify.put('/api/customer/display/:id', { schema: customerShema.displayCustomerSchema}, customerHandler.displayCustomer);

    fastify.delete('/api/customer/delete/:id', { schema: customerShema.deleteCustomerSchema}, customerHandler.deleteCustomer);

    fastify.post('/api/customer/check-login',{schema: customerShema.checkLoginSchema}, customerHandler.checkLogin);

    // fastify.put('/api/customer/update-customer-address/:id',{schema: customerShema.updateCustomerAndAddressSchema}, customerHandler.updateCustomerAndAddress);

    fastify.put('/api/customer/update-password/:id', {schema: customerShema.updatePasswordCustomerSchema}, customerHandler.updateCustomerPassword);

    fastify.put('/api/customer/update-address/:id',{ schema: customerShema.updateCustomerAddressSchema}, customerHandler.updateCustomerAddress);


    // fastify.post('/api/user/forgot-password',{ schema: userShema.forgotPasswordSchema}, userHandler.forgotPassword);


    done();
};