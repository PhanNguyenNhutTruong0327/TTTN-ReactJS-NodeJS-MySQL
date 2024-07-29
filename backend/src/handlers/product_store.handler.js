const storeService = require('../services/product_store.service');

function createStore(req, res) {
    const data = req.body;
    storeService.createImport(this.mysql, data)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}

module.exports = {
    createStore,


}
