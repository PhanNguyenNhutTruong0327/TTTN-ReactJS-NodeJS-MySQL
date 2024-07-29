const createSaleSchema = require("./sale.create.schema");
const deleteSaleSchema = require("./sale.delete.schema");
const displaySaleSchema = require("./sale.display.schema");
const getAllSaleSchema = require("./sale.getall.schema");
const getAllSaleStatus1Schema = require("./sale.getallsale.schema");
const getAllTrashSaleSchema = require("./sale.getlisttrash.schema");
const getOneSaleSchema = require("./sale.getone.schema");
const rescoverTrashSaleSchema = require("./sale.rescovertrash.schema");
const trashSaleSchema = require("./sale.trash.schema");
const updateSaleSchema = require("./sale.update.schema");

module.exports = {
    getAllSaleSchema,
    getOneSaleSchema,
    createSaleSchema,
    updateSaleSchema,
    getAllTrashSaleSchema,
    displaySaleSchema,
    rescoverTrashSaleSchema,
    deleteSaleSchema,
    trashSaleSchema,
    getAllSaleStatus1Schema,



};