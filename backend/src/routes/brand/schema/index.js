const createBrandSchema = require("./brand.create.schema");
const deleteBrandSchema = require("./brand.delete.schema");
const displayBrandSchema = require("./brand.display.schema");
const getAllBrandSchema = require("./brand.getall.schema");
const getBrandFESchema = require("./brand.getbrandfe.schema");
const getOneBrandSchema = require("./brand.getone.schema");
const getAllTrashBrandSchema = require("./brand.gettrash.schema");
const rescoverTrashBrandSchema = require("./brand.rescovertrash.schema");
const trashBrandSchema = require("./brand.trash.schema");
const updateBrandSchema = require("./brand.update.schema");

module.exports = {
    getAllBrandSchema,
    getOneBrandSchema,
    getBrandFESchema,
    trashBrandSchema,
    getAllTrashBrandSchema,
    rescoverTrashBrandSchema,
    deleteBrandSchema,
    displayBrandSchema,
    createBrandSchema,
    updateBrandSchema


};