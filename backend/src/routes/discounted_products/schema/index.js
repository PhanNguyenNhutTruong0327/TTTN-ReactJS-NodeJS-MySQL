const createDiscountedProSchema = require("./discounted_products.create.schema");
const deleteDiscountedProSchema = require("./discounted_products.delete.schema");
const displayDiscountedProSchema = require("./discounted_products.display.schema");
const getAllDiscountedProductsSchema = require("./discounted_products.getall.schema");
const getDiscountedProByIdSchema = require("./discounted_products.getbyid.schema");
const getOneDiscountedProductSchema = require("./discounted_products.getone.schema");
const getDiscountedProWithLimitSchema = require("./discounted_products.getwithlimit.schema");
const getTrashDiscountedProductsSchema = require("./discounted_products.listtrash.schema");
const rescoverTrashDiscountedProSchema = require("./discounted_products.rescovertrash");
const trashDiscountedProSchema = require("./discounted_products.trash.schema");
const updateDiscountedProSchema = require("./discounted_products.update.schema");

module.exports = {
    getAllDiscountedProductsSchema,
    getDiscountedProWithLimitSchema,
    getOneDiscountedProductSchema,
    createDiscountedProSchema,
    getTrashDiscountedProductsSchema,
    rescoverTrashDiscountedProSchema,
    trashDiscountedProSchema,
    displayDiscountedProSchema,
    deleteDiscountedProSchema,
    updateDiscountedProSchema,
    getDiscountedProByIdSchema,
    


};