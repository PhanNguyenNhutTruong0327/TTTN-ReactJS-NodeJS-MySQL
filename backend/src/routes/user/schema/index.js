const checkLoginSchema = require("./user.checklogin.schema");
const createUserSchema = require("./user.create.schema");
const deleteUserSchema = require("./user.delete.schema");
const displayUserSchema = require("./user.display.schema");
const forgotPasswordSchema = require("./user.forgotpassword.schema");
const getAllUserSchema = require("./user.getall.schema");
const getOneUserSchema = require("./user.getone.schema");
const getAllTrashUserSchema = require("./user.gettrash.schema");
const rescoverTrashUserSchema = require("./user.rescovertrash.schema");
const trashUserSchema = require("./user.trash.schema");
const updateUserSchema = require("./user.update.schema");
const updateCustomerAddressSchema = require("./user.updatecustomeraddress.schema");
const updatePasswordCustomerSchema = require("./user.updatepasswordcustomer.schema");
const updateUserAndAddressSchema = require("./user.updateuserandaddress.schema");

module.exports = {
    getAllUserSchema,
    getOneUserSchema,
    createUserSchema,
    displayUserSchema,
    updateUserSchema,
    deleteUserSchema,
    getAllTrashUserSchema,
    rescoverTrashUserSchema,
    trashUserSchema,
    checkLoginSchema,
    updateUserAndAddressSchema,
    updatePasswordCustomerSchema,
    updateCustomerAddressSchema,
    forgotPasswordSchema,
    
    

};