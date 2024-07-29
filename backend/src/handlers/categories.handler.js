const categoriesService = require('../services/categories.service');

function getAll(req, res) {
    categoriesService.getAll(this.mysql)
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
    categoriesService.getOne(this.mysql, id)
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


function getByParent(req, res) {
    const parent = req.params.parent;
    categoriesService.getByParent(this.mysql, parent)
        .then((result) => {
            // if (!result) {
            //     res.status(404).send({ error: 'Not Found' });
            // }
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error: ', err);
            // res.status(500).send({ error: 'Internal Server Error' });

        })
}


function createCategory(req, res) {
    const data = req.body;
    categoriesService.createCategory(this.mysql, data)
        .then((result) => {
            const id = result.insertId;
            return categoriesService.getOne(this.mysql, id);
        })
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function updateCategory(req, res) {
    const data = req.body;
    const id = req.params.id;
    categoriesService.updateCategory(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ Error: 'Not Found' });
                return;
            }
            const item = await categoriesService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch((err) => {
            console.error('Database Error: ' + err.message);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}


function trashCategory(req, res) {
    const id = req.params.id;
    categoriesService.trashCategory(this.mysql, id)
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


function rescoverTrashCategory(req, res) {
    const id = req.params.id;
    categoriesService.rescoverTrashCategory(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return categoriesService.getOne(this.mysql, id);

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
    categoriesService.getListTrash(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function desplayCategory(req, res) {
    const id = req.params.id;
    categoriesService.displayCategory(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return categoriesService.getOne(this.mysql, id);

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


async function deleteCategory(req, res) {
    const id = req.params.id;
    try{
        const item = await categoriesService.getOne(this.mysql, id);
        console.log('Item:', item);
        if(!item){
            res.status(404).send({error: 'Category not found'});
        }
        const result = await categoriesService.deleteCategory(this.mysql, id);
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
    getByParent,
    createCategory,
    updateCategory,
    trashCategory,
    rescoverTrashCategory,
    getListTrash,
    desplayCategory,
    deleteCategory,
};