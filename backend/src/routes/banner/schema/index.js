const createBannerSchema = require("./banner.create.schema");
const deleteBannerSchema = require("./banner.delete.schema");
const displayBannerSchema = require("./banner.display.schema");
const getAllBannerSchema = require("./banner.getall.schema");
const getOneBannerSchema = require("./banner.getone.schema");
const getSliderFESchema = require("./banner.getsliderfe.schema");
const getTrashBannerSchema = require("./banner.gettrash.schema");
const rescoverTrashBannerSchema = require("./banner.rescovertrash.schema");
const trashBannerSchema = require("./banner.trash.schema");
const updateBannerSchema = require("./banner.update.schema");

module.exports = {
    getSliderFESchema,
    getAllBannerSchema,
    getOneBannerSchema,
    createBannerSchema,
    updateBannerSchema,
    trashBannerSchema,
    rescoverTrashBannerSchema,
    getTrashBannerSchema,
    deleteBannerSchema,
    displayBannerSchema
    
}