const createProductSchema = require("./product.create.schema");
const deleteProductSchema = require("./product.delete.schema");
const displayProductSchema = require("./product.display.schema");
const getAllProductSchema = require("./product.getall.schema");
const getAllProductPaginationSchema = require("./product.getallproductpagination.schema");
const getAllProductNotSaleSchema = require("./product.getallpronosale.schema");
const getProductBestSellerSchema = require("./product.getbestseller.schema");
const getProductByBrandPaginationSchema = require("./product.getbybrandpagination.schema");
const getProductByCategorySchema = require("./product.getbycategory.schema");
const getProductByCategoryPaginationSchema = require("./product.getbycategorypagination.schema");
const getProductByCategoryAndOrtherSchema = require("./product.getdetailandother.schema");
const getListTrashSchema = require("./product.getlisttrash.schema");
const getOneProductSchema = require("./product.getone.schema");
const rescoverTrashProductSchema = require("./product.rescovertrash.schema");
const getSearchProductPaginationSchema = require("./product.searchbyname.schema");
const trashProductSchema = require("./product.trash.schema");
const updateProductSchema = require("./product.update.schema");

module.exports = {
    getAllProductSchema,
    getOneProductSchema,
    getProductByCategorySchema,
    getProductByCategoryPaginationSchema,
    getProductByCategoryAndOrtherSchema,
    getProductByBrandPaginationSchema,
    getAllProductPaginationSchema,
    displayProductSchema,
    getSearchProductPaginationSchema,
    trashProductSchema,
    rescoverTrashProductSchema,
    getListTrashSchema,
    deleteProductSchema,
    getAllProductNotSaleSchema,
    createProductSchema,
    updateProductSchema,
    getProductBestSellerSchema,


}