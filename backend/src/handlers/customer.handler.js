const customerService = require('../services/customer.service');

function getAll(req, res) {

    const { page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const validPage = pageNum > 0 ? pageNum : 1;
    const validLimit = limitNum > 0 ? limitNum : 10;


    customerService.getAll(this.mysql, validPage, validLimit)
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
    customerService.getOne(this.mysql, id)
        .then((result) => {
            // if (!result) {
            //     res.status(404).send({ error: 'Not Found' });
            // }
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}


function createCustomer(req, res) {
    const data = req.body;
    customerService.createCustomer(this.mysql, data)
        .then((result) => {
            res.send(result);
        })

        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function updateCustomer(req, res) {
    const data = req.body;
    const id = req.params.id;
    customerService.updateCustomer(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ Error: 'Not Found' });
                return;
            }
            const item = await customerService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch((err) => {
            console.error('Database Error: ' + err.message);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}


function trashCustomer(req, res) {
    const id = req.params.id;
    customerService.trashCustomer(this.mysql, id)
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


function rescoverTrashCustomer(req, res) {
    const id = req.params.id;
    customerService.rescoverTrashCustomer(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return customerService.getOne(this.mysql, id);

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
    const roles = req.params.roles
    customerService.getListTrash(this.mysql, roles)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function displayCustomer(req, res) {
    const id = req.params.id;
    customerService.displayCustomer(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return customerService.getOne(this.mysql, id);

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


async function deleteCustomer(req, res) {
    const id = req.params.id;
    try{
        const item = await customerService.getOne(this.mysql, id);
        console.log('Item:', item);
        if(!item){
            res.status(404).send({error: 'User not found'});
        }
        const result = await customerService.deleteCustomer(this.mysql, id);
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


function checkLogin(req, res) {
    const data = req.body;
    console.log(data);
    customerService.checkLogin(this.mysql, data)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function updateCustomerAndAddress(req, res) {
    const data = req.body;
    const id = req.params.id;
    customerService.updateCustomerAndAddress(this.mysql, data, id)
        .then(async (result) => {
            
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error: ' + err.message);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}


function updateCustomerPassword(req, res) {
    const data = req.body;
    const id = req.params.id;
    customerService.updatePasswordCustomer(this.mysql, data, id)
        .then(async (result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error: ' + err.message);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}


function updateCustomerAddress(req, res) {
    const data = req.body;
    const id = req.params.id;
    customerService.updateCustomerAddress(this.mysql, data, id)
        .then(async (result) => {
            
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error: ' + err.message);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}


function forgotPassword(req, res) {
    const data = req.body;
    console.log(data);
    customerService.forgotPassword(this.mysql, data)
        .then((result) => {
            res.send(result);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


module.exports = {
    getAll,
    getOne,
    createCustomer,
    updateCustomer,
    trashCustomer,
    rescoverTrashCustomer,
    getListTrash,
    displayCustomer,
    deleteCustomer,
    checkLogin,
    updateCustomerAndAddress,
    updateCustomerPassword,
    updateCustomerAddress,
    forgotPassword,




    

};