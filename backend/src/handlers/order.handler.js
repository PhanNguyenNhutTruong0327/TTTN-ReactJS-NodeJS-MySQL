const orderService = require('../services/order.service');


function getOrderByUserIdPagination(req, res) {

    const user_id = req.params.user_id;

    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const validPage = pageNum > 0 ? pageNum : 1;
    const validLimit = limitNum > 0 ? limitNum : 10;

    orderService.getOrderByUserIdPagination(this.mysql, user_id, validPage, validLimit)
        .then((result) => {
            if (!result || !result.data) {
                res.status(404).send({ error: 'No product found' });
                return;
            }
            // const formattedResult = {
            //     data: result.data.map(product => ({
            //         id: product.id,
            //         name: product.name,
            //         image: product.image,
            //         price: product.price,
            //     })),
            //     meta: {
            //         pagination: result.meta.pagination
            //     }
            // };
            res.send(result);
        })
        .catch((err) => {
            console.error('Database error: ' + err);
            res.status(500).send({ error: 'Internal Server Error !' });
        })
}


function getAllOrderByUserIdPagination(req, res) {

    const user_id = req.params.user_id;

    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const validPage = pageNum > 0 ? pageNum : 1;
    const validLimit = limitNum > 0 ? limitNum : 10;

    orderService.getAllOrderByUserIdPagination(this.mysql, user_id, validPage, validLimit)
        .then((result) => {
            if (!result || !result.data) {
                res.status(404).send({ error: 'No product found' });
                return;
            }
            res.send(result);
        })
        .catch((err) => {
            console.error('Database error: ' + err);
            res.status(500).send({ error: 'Internal Server Error !' });
        })
}

function create(req, res) {
    const data = req.body;
    orderService.create(this.mysql, data)
        .then((result) => {
            const id = result.insertId;
            return orderService.getOne(this.mysql, id);
        })
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function getAllWithPagination(req, res) {

    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const validPage = pageNum > 0 ? pageNum : 1;
    const validLimit = limitNum > 0 ? limitNum : 10;

    orderService.getAll(this.mysql, validPage, validLimit)
        .then((result) => {
            if (!result || !result.data) {
                res.status(404).send({ error: 'No product found' });
                return;
            }
            res.send(result);
        })
        .catch((err) => {
            console.error('Database error: ' + err);
            res.status(500).send({ error: 'Internal Server Error !' });
        })
}

function getAllOrderCancel(req, res) {

    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const validPage = pageNum > 0 ? pageNum : 1;
    const validLimit = limitNum > 0 ? limitNum : 10;

    orderService.getAllOrderCancel(this.mysql, validPage, validLimit)
        .then((result) => {
            if (!result || !result.data) {
                res.status(404).send({ error: 'No product found' });
                return;
            }
            res.send(result);
        })
        .catch((err) => {
            console.error('Database error: ' + err);
            res.status(500).send({ error: 'Internal Server Error !' });
        })
}



function getOne(req, res) {
    const id = req.params.id;
    orderService.getOne(this.mysql, id)
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


function updateStatusOrder(req, res) {
    const data = req.body;
    const id = req.params.id;
    orderService.updateStatusOrder(this.mysql, data, id)
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


module.exports = {
    getOrderByUserIdPagination,
    getAllOrderByUserIdPagination,
    create,
    getAllWithPagination,
    getOne,
    getAllOrderCancel,
    updateStatusOrder,

    
}