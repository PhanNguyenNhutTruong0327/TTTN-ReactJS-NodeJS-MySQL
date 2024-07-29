const createTopicSchema = require("./topic.create.schema");
const deleteTopicSchema = require("./topic.delete.schema");
const displayTopicSchema = require("./topic.display.schema");
const getAllTopicSchema = require("./topic.getall.schema");
const getAllTrashTopicSchema = require("./topic.getalltrash.schema");
const getParentTopicSchema = require("./topic.getbyparent.schema");
const getOneTopicSchema = require("./topic.getone.schema");
const rescoverTrashTopicSchema = require("./topic.rescovertrash.schema");
const trashTopicSchema = require("./topic.trash.schema");
const updateTopicSchema = require("./topic.update.schema");

module.exports = {
  getAllTopicSchema,
  getOneTopicSchema,
  createTopicSchema,
  updateTopicSchema,
  trashTopicSchema,
  rescoverTrashTopicSchema,
  getAllTrashTopicSchema,
  displayTopicSchema,
  deleteTopicSchema,
  getParentTopicSchema,
  


};