const checkLoginSchema = require("./customer.checklogin.schema");
const createCustomerSchema = require("./customer.create.schema");
const deleteCustomerSchema = require("./customer.delete.schema");
const displayCustomerSchema = require("./customer.display.schema");
const getAllCustomerSchema = require("./customer.getall.schema");
const getOneCustomerSchema = require("./customer.getone.schema");
const getAllTrashCustomerSchema = require("./customer.listtrash.schema");
const rescoverTrashCustomerSchema = require("./customer.rescovertrash.schema");
const trashCustomerSchema = require("./customer.trash.schema");
const updateCustomerSchema = require("./customer.update.schema");
const updateCustomerAddressSchema = require("./customer.updatecustomeraddress.schema");
const updateCustomerAndAddressSchema = require("./customer.updatecustomerandaddress.schema");
const updatePasswordCustomerSchema = require("./customer.updatepasswordcustomer.schema");

module.exports = {
    getAllCustomerSchema,
    getOneCustomerSchema,
    createCustomerSchema,
    updateCustomerSchema,
    trashCustomerSchema,
    rescoverTrashCustomerSchema,
    getAllTrashCustomerSchema,
    deleteCustomerSchema,
    displayCustomerSchema,
    checkLoginSchema,
    updateCustomerAddressSchema,
    updateCustomerAndAddressSchema,
    updatePasswordCustomerSchema,


}