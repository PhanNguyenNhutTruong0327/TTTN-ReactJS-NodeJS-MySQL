const orderShema = require('./schema');
const orderHandler = require('../../handlers/order.handler');
const schemas = require('fastify/lib/schemas');

module.exports = function (fastify, opts, done) {

    fastify.get('/api/order/order-by-user-id/:user_id', { schema: orderShema.getOrderByUserIdSchema }, orderHandler.getOrderByUserIdPagination );

    fastify.get('/api/order/list-order-by-user-id/:user_id',{schema: orderShema.getAllOrderByUserIdSchema}, orderHandler.getAllOrderByUserIdPagination);

    fastify.post('/api/order/create',{schema: orderShema.createOrderSchema}, orderHandler.create);

    fastify.get('/api/orders', {schema: orderShema.getAllOrderSchema}, orderHandler.getAllWithPagination);

    fastify.get('/api/order/show/:id', {schema: orderShema.getOneOrderSchema}, orderHandler.getOne);

    fastify.get('/api/orders/cancel',{schema: orderShema.getAllOrderCancelSchema}, orderHandler.getAllOrderCancel);

    fastify.put('/api/order/update-status/:id',{schema: orderShema.updateStatusOrderSchema}, orderHandler.updateStatusOrder);

    done();
};