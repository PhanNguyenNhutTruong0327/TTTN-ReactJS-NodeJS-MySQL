const saleService = require('../services/sale.service');

function getAll(req, res) {
    saleService.getAll(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}


function getAllSale(req, res) {
    saleService.getAllSale(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}



function getOne(req, res) {
    const id = req.params.id;
    saleService.getOne(this.mysql, id)
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


// function getByParent(req, res) {
//     const parent = req.params.parent;
//     topicService.getByParent(this.mysql, parent)
//         .then((result) => {
//             // if (!result) {
//             //     res.status(404).send({ error: 'Not Found' });
//             // }
//             res.send(result);
//         })
//         .catch((err) => {
//             console.error('Database Error: ', err);
//             // res.status(500).send({ error: 'Internal Server Error' });

//         })
// }


function createSale(req, res) {
    const data = req.body;
    saleService.createSale(this.mysql, data)
        .then((result) => {
            const id = result.insertId;
            return saleService.getOne(this.mysql, id);
        })
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function updateSale(req, res) {
    const data = req.body;
    const id = req.params.id;
    saleService.updateSale(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ Error: 'Not Found' });
                return;
            }
            const item = await saleService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch((err) => {
            console.error('Database Error: ' + err.message);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}


function trashSale(req, res) {
    const id = req.params.id;
    saleService.trashSale(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return result;
        })
        .then(item => {
            res.send(item);
        })
        .catch((err) => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });

}


function rescoverTrashSale(req, res) {
    const id = req.params.id;
    saleService.rescoverTrashSale(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return saleService.getOne(this.mysql, id);

            // res.send(result);
        })
        .then(item => {
            res.send(item);
        })
        .catch((err) => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });

}

function getListTrash(req, res) {
    saleService.getListTrash(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function displaySale(req, res) {
    const id = req.params.id;
    saleService.displaySale(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return saleService.getOne(this.mysql, id);

            // res.send(result);
        })
        .then(item => {
            res.send(item);
        })
        .catch((err) => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });

}


async function deleteSale(req, res) {
    const id = req.params.id;
    try{
        const item = await saleService.getOne(this.mysql, id);
        console.log('Item:', item);
        if(!item){
            res.status(404).send({error: 'Sale not found'});
        }
        const result = await saleService.deleteSale(this.mysql, id);
        if(result.error){
            res.status(404).send(result);
        }
        else{
            res.send(item);
        }
    }
    catch(err){
        console.error('Database Error: ' , err);
        res.status(500).send({error: 'Internal Server Error'});
    }
}


module.exports = {
    getAll,
    getOne,
    getAllSale,
    createSale,
    updateSale,
    trashSale,
    rescoverTrashSale,
    getListTrash,
    displaySale,
    deleteSale,

};