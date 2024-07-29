const postService = require('../services/post.service');


function getPostNew(req, res) {

    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const validPage = pageNum > 0 ? pageNum : 1;
    const validLimit = limitNum > 0 ? limitNum : 10;

    postService.getPostNew(this.mysql, validPage, validLimit)
        .then((result) => {
            if (!result || !result.data) {
                res.status(404).send({ error: 'No post found' });
                return;
            }
            const formattedResult = {
                data: result.data.map(post => ({
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    description_1: post.description_1,
                    description_2: post.description_2,
                    description_3: post.description_3,
                    image_1: post.image_1,
                    image_2: post.image_2,
                    image_3: post.image_3,
                    status: post.status,
                    created_at: post.created_at

                })),
                meta: {
                    pagination: result.meta.pagination
                }
            };
            res.send(formattedResult);
        })
        .catch((err) => {
            console.error('Database error: ' + err);
            res.status(500).send({ error: 'Internal Server Error !' });
        })
}


function getAllPostByType(req, res) {

    const type = req.params.type;

    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const validPage = pageNum > 0 ? pageNum : 1;
    const validLimit = limitNum > 0 ? limitNum : 10;

    postService.getAll(this.mysql, type, validPage, validLimit)
        .then((result) => {
            if (!result || !result.data) {
                res.status(404).send({ error: 'No post found' });
                return;
            }
            const formattedResult = {
                data: result.data.map(post => ({
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    description_1: post.description_1,
                    image_1: post.image_1,
                    status: post.status,
                    name_topic: post.name_topic,
                })),
                meta: {
                    pagination: result.meta.pagination
                },
            };
            res.send(formattedResult);
        })
        .catch((err) => {
            console.error('Database error: ' + err);
            res.status(500).send({ error: 'Internal Server Error !' });
        })
}


function getOne(req, res) {
    const id = req.params.id;
    postService.getOne(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}


function trashPost(req, res) {
    const id = req.params.id;
    postService.trashPost(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });

}


function displayPost(req, res) {
    const id = req.params.id;
    postService.displayPost(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }


            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });

}


function rescoverTrash(req, res) {
    const id = req.params.id;
    postService.rescoverTrash(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }

            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });

}


function getListTrash(req, res) {
    const type = req.params.type;

    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const validPage = pageNum > 0 ? pageNum : 1;
    const validLimit = limitNum > 0 ? limitNum : 10;

    postService.getListTrash(this.mysql, type, validPage, validLimit)
        .then((result) => {
            if (!result || !result.data) {
                res.status(404).send({ error: 'No post found' });
                return;
            }
            const formattedResult = {
                data: result.data.map(post => ({
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    description_1: post.description_1,
                    image_1: post.image_1,
                    status: post.status,
                    name_topic: post.name_topic,
                })),
                meta: {
                    pagination: result.meta.pagination
                },
            };
            res.send(formattedResult);
        })
        .catch((err) => {
            console.error('Database error: ' + err);
            res.status(500).send({ error: 'Internal Server Error !' });
        })

}


async function deletePost(req, res) {
    const id = req.params.id;
    try {
        const result = await postService.deletePost(this.mysql, id);
        if (!result) {
            res.status(404).send({ error: 'Not Found' });
        }
        res.send(result);
    }
    catch (err) {
        console.error('Database Error: ', err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}


function createPost(req, res) {
    if(!req.body){
        console.error('No data provided');
        res.status(400).send({ error: 'No data provided' });
        return;
    }
    const data = req.body;
    postService.createPost(this.mysql, data)
        .then((result) => {
            const id = result.insertId;
            return postService.getOne(this.mysql, id);
        })
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}

function updatePost(req, res) {
    if(!req.body){
        console.error('No data provided');
        res.status(400).send({ error: 'No data provided' });
        return;
    }
    const id = req.params.id;
    const data = req.body;
    postService.updatePost(this.mysql, data, id)
        .then((result) => {
            return postService.getOne(this.mysql, result.id);
        })
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}

function getPostBySlugTopic(req, res) {

    const slug = req.params.slug;

    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const validPage = pageNum > 0 ? pageNum : 1;
    const validLimit = limitNum > 0 ? limitNum : 10;

    postService.getPostBySlugTopic(this.mysql, slug, validPage, validLimit)
        .then((result) => {
            if (!result || !result.data) {
                res.status(404).send({ error: 'No post found' });
                return;
            }
            const formattedResult = {
                data: result.data.map(post => ({
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    description_1: post.description_1,
                    image_1: post.image_1,
                    status: post.status,
                    name_topic: post.name_topic,
                })),
                meta: {
                    pagination: result.meta.pagination
                },
            };
            res.send(formattedResult);
        })
        .catch((err) => {
            console.error('Database error: ' + err);
            res.status(500).send({ error: 'Internal Server Error !' });
        })
}


function getDeatilPostBySlugAndPostOther(req, res) {

    const slug = req.params.slug;

    postService.getDetailPostBySlugAndPostOther(this.mysql, slug)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });

        })
}




module.exports = {
    getPostNew,
    getAllPostByType,
    getOne,
    trashPost,
    displayPost,
    rescoverTrash,
    getListTrash,
    deletePost,
    createPost,
    getPostBySlugTopic,
    getDeatilPostBySlugAndPostOther,
    updatePost:updatePost,
    
    
    

}