const createPostSchema = require("./post.create.schema");
const deletePostSchema = require("./post.delete.schema");
const getDetailPostAndOrtherSchema = require("./post.detailandother.schema");
const displayPostSchema = require("./post.display.schema");
const getAllPostByTypeSchema = require("./post.getallpostbytype.schema");
const getPostBySlugTopicSchema = require("./post.getbyslugtopic.schema");
const getListTrashPostByTypeSchema = require("./post.getlisttrash.schema");
const getPostNewSchema = require("./post.getnew.schema");
const getOnePostSchema = require("./post.getone.schema");
const rescoverTrashPostSchema = require("./post.rescovertrash.schema");
const trashPostSchema = require("./post.trash.schema");
const updatePostSchema = require("./post.update.schema");

module.exports = {
    getPostNewSchema,
    getAllPostByTypeSchema,
    getOnePostSchema,
    trashPostSchema,
    rescoverTrashPostSchema,
    displayPostSchema,
    getListTrashPostByTypeSchema,
    deletePostSchema,
    createPostSchema,
    getPostBySlugTopicSchema,
    getDetailPostAndOrtherSchema,
    updatePostSchema,
    


    
}