const discounted_productsService = require('../services/discounted_products.service');

function getAll(req, res) {

    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const validPage = pageNum > 0 ? pageNum : 1;
    const validLimit = limitNum > 0 ? limitNum : 10;

    discounted_productsService.getAll(this.mysql, validPage, validLimit)
        .then((result) => {
            if (!result || !result.data) {
                res.status(404).send({ error: 'No product found' });
                return;
            }
            const formattedResult = {
                data: result.data.map(product => ({
                    id: product.id,
                    product_id: product.product_id,
                    sale_id: product.sale_id,
                    start_time: product.start_time,
                    end_time: product.end_time,
                    status: product.status,
                    title_sale: product.title_sale,
                    name_pro: product.name_pro,
                    image: product.image,
                    price_sale: product.price_sale,
                    price: product.price
                })),
               
                meta: {
                    pagination: result.meta.pagination
                }
            }
            res.send(formattedResult);

        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}


function getOne(req, res) {
    const id = req.params.id;
    discounted_productsService.getOne(this.mysql, id)
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


function getProductSaleLimit(req, res) {

    const limit = req.params.limit;
    discounted_productsService.getProductSaleLimit(this.mysql, limit)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}


function trashProSale(req, res) {
    const id = req.params.id;
    discounted_productsService.trashPro(this.mysql, id)
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
    discounted_productsService.rescoverTrash(this.mysql, id)
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


async function deletePro(req, res) {
    const id = req.params.id;
    try {
        const result = await discounted_productsService.deletePro(this.mysql, id);
        if (result.error) {
            res.status(404).send(result);
        }
        else {
            res.send(result);
        }

    }
    catch (err) {
        console.error('Database Error: ', err);
        res.status(500).send({ error: 'Internal Server Error !' });
    };

}


function displayDiscountedPro(req, res) {
    const id = req.params.id;
    discounted_productsService.displayDiscountedPro(this.mysql, id)
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


function createDiscountedPro(req, res) {
    const data = req.body;
    discounted_productsService.createDiscountedPro(this.mysql, data)
        .then((result) => {
            const id = result.insertId;
            return discounted_productsService.getById(this.mysql, id);
        })
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function updateDiscountedPro(req, res) {
    const data = req.body;
    const id = req.params.id;
    discounted_productsService.updateDiscountedPro(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ Error: 'Not Found' });
                return;
            }
            const item = await discounted_productsService.getById(this.mysql, id);
            console.log(item);
            res.send(item);
        })
        .catch((err) => {
            console.error('Database Error: ' + err.message);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}


function getListTrash(req, res) {

    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const validPage = pageNum > 0 ? pageNum : 1;
    const validLimit = limitNum > 0 ? limitNum : 10;

    discounted_productsService.getTrash(this.mysql, validPage, validLimit)
        .then((result) => {
            if (!result || !result.data) {
                res.status(404).send({ error: 'No product found' });
                return;
            }
            const formattedResult = {
                data: result.data.map(product => ({
                    id: product.id,
                    product_id: product.product_id,
                    sale_id: product.sale_id,
                    start_time: product.start_time,
                    end_time: product.end_time,
                    status: product.status,
                    title_sale: product.title_sale,
                    name_pro: product.name_pro,
                    image: product.image,
                    price_sale: product.price_sale,
                    price: product.price
                })),
               
                meta: {
                    pagination: result.meta.pagination
                }
            }
            res.send(formattedResult);

        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}


function getById(req, res) {
    const id = req.params.id;
    discounted_productsService.getById(this.mysql, id)
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
    getAll,
    getOne,
    getProductSaleLimit,
    getListTrash,
    rescoverTrash,
    trashProSale,
    displayDiscountedPro,
    deletePro,
    createDiscountedPro,
    updateDiscountedPro,
    getById,
    

}
