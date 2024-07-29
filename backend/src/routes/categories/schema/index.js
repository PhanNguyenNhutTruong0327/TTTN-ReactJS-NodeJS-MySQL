const createCategoriesSchema = require("./categories.create.schema");
const deleteCategoriesSchema = require("./categories.delete.schema");
const desplayCategoriesSchema = require("./categories.desplay.schema");
const getAllCategoriesSchema = require("./categories.getall.schema");
const getOneCategoriesSchema = require("./categories.getone.schema");
const getParentCategoriesSchema = require("./categories.getparent.schema");
const getAllTrashCategorySchema = require("./categories.gettrash.schema");
const rescoverTrashCategorySchema = require("./categories.rescovertrash.schema");
const trashCategoriesSchema = require("./categories.trash.schema");
const updateCategoriesSchema = require("./categories.update.schema");

module.exports = {
  getAllCategoriesSchema,
  getOneCategoriesSchema,
  getParentCategoriesSchema,
  createCategoriesSchema,
  updateCategoriesSchema,
  trashCategoriesSchema,
  rescoverTrashCategorySchema,
  getAllTrashCategorySchema,
  desplayCategoriesSchema,
  deleteCategoriesSchema,
  


};