const createOrderSchema = require("./order.create.schema");
const getAllOrderByUserIdSchema = require("./order.getallorderbyuserid.schema");
const getAllOrderCancelSchema = require("./order.getallordercancelpagination.schema");
const getAllOrderSchema = require("./order.getallpagination.schema");
const getOneOrderSchema = require("./order.getone.schema");
const getOrderByUserIdSchema = require("./order.getorderbyuserid.schema");
const updateStatusOrderSchema = require("./order.updatestatusorder.schema");

module.exports = {
    getOrderByUserIdSchema,
    getAllOrderByUserIdSchema,
    createOrderSchema,
    getAllOrderSchema,
    getOneOrderSchema,
    getAllOrderCancelSchema,
    updateStatusOrderSchema,
    

}