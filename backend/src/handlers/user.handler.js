const userService = require('../services/user.service');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


function getAll(req, res) {

    userService.getAll(this.mysql)

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
    userService.getOne(this.mysql, id)
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

function createUser(req, res) {
    const data = req.body;
    userService.createUser(this.mysql, data)
        .then((result) => {
            const id = result.insertId;
            return userService.getOne(this.mysql, id);
        })
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}

function updateUser(req, res) {
    const data = req.body;
    const id = req.params.id;
    userService.updateUser(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ Error: 'Not Found' });
                return;
            }
            const item = await userService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch((err) => {
            console.error('Database Error: ' + err.message);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}


function trashUser(req, res) {
    const id = req.params.id;
    userService.trashUser(this.mysql, id)
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


function rescoverTrashUser(req, res) {
    const id = req.params.id;
    userService.rescoverTrashUser(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return userService.getOne(this.mysql, id);

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
    userService.getListTrash(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function displayUser(req, res) {
    const id = req.params.id;
    userService.displayUser(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return userService.getOne(this.mysql, id);

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


async function deleteUser(req, res) {
    const id = req.params.id;
    try{
        const item = await userService.getOne(this.mysql, id);
        console.log('Item:', item);
        if(!item){
            res.status(404).send({error: 'User not found'});
        }
        const result = await userService.deleteUser(this.mysql, id);
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


async function checkLogin(req, res) {
    try{
        const {email, password} = req.body;
        const user = await userService.checkLogin(this.mysql, {email});
        if(!user){
            res.status(401).send({error: 'Unauthorized'});
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(401).send({error: 'Unauthorized'});
            return;
        }
        const secretkey = process.env.JWT_SECRET_KEY;
        if(!secretkey){
            console.error('JWT_SECRET_KEY is not set in environment variable');
            res.status(500).send({error: 'Internal Server Error'});
            return;
        }
        const token = jwt.sign({id: user.id, name: user.name}, secretkey, {expiresIn: '2h'});
        const response = {
            jwt: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role_id: user.role_id,
                role_name: user.role_name
            }
        };
        res.send(response);


    }catch(err){
        console.error('Database or bcrypt error: ' + err);
        res.status(500).send({error: 'Internal Server Error'});
    }
}



function updateUserPassword(req, res) {
    const data = req.body;
    const id = req.params.id;
    userService.updatePasswordCustomer(this.mysql, data, id)
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
    userService.forgotPassword(this.mysql, data)
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
    createUser,
    updateUser,
    trashUser,
    rescoverTrashUser,
    getListTrash,
    displayUser,
    deleteUser,
    checkLogin,
    updateUserPassword,
    forgotPassword,




    

};