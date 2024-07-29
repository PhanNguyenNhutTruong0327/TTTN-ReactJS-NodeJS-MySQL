const topicService = require('../services/topic.service');

function getAll(req, res) {
    topicService.getAll(this.mysql)
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
    topicService.getOne(this.mysql, id)
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


function getByParentId(req, res) {
    const parent = req.params.parent;
    topicService.getByParentId(this.mysql, parent)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error: ', err);
        })
}


function createTopic(req, res) {
    const data = req.body;
    topicService.createTopic(this.mysql, data)
        .then((result) => {
            const id = result.insertId;
            return topicService.getOne(this.mysql, id);
        })
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function updateTopic(req, res) {
    const data = req.body;
    const id = req.params.id;
    topicService.updateTopic(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ Error: 'Not Found' });
                return;
            }
            const item = await topicService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch((err) => {
            console.error('Database Error: ' + err.message);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}


function trashTopic(req, res) {
    const id = req.params.id;
    topicService.trashTopic(this.mysql, id)
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


function rescoverTrashTopic(req, res) {
    const id = req.params.id;
    topicService.rescoverTrashTopic(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return topicService.getOne(this.mysql, id);

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
    topicService.getListTrash(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function desplayTopic(req, res) {
    const id = req.params.id;
    topicService.displayTopic(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return topicService.getOne(this.mysql, id);

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


async function deleteTopic(req, res) {
    const id = req.params.id;
    try{
        const item = await topicService.getOne(this.mysql, id);
        console.log('Item:', item);
        if(!item){
            res.status(404).send({error: 'Topic not found'});
        }
        const result = await topicService.deleteTopic(this.mysql, id);
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
    getByParentId,
    createTopic,
    updateTopic,
    trashTopic,
    rescoverTrashTopic,
    getListTrash,
    desplayTopic,
    deleteTopic,
    

};