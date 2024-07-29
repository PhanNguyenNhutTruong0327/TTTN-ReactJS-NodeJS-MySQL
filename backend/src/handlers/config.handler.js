const configService = require('../services/config.service');

function getConfig(req, res) {
    configService.getConfig(this.mysql)
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
    configService.getOne(this.mysql, id)
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


function getBannerFE(req, res) {
    const position = req.params.position;
    bannerService.getBannerFE(this.mysql , position)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

function trashBrand(req, res) {
    const id = req.params.id;
    brandService.trashBrand(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return brandService.getOne(this.mysql, id);

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


function rescoverTrashBrand(req, res) {
    const id = req.params.id;
    brandService.rescoverTrashBrand(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return brandService.getOne(this.mysql, id);

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
    brandService.getListTrash(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


async function deleteBrand(req, res) {
    const id = req.params.id;
    try {
        const item = await brandService.getOne(this.mysql, id);
        console.log('Item:', item);
        if(!item){
            res.status(404).send({error: 'Brand not found'});
        }
        const result = await brandService.deleteBrand(this.mysql, id);
        if(result.error){
            res.status(404).send(result);
        }
        else{
            res.send(item);
        }

    }
    catch (err) {
        console.error('Database Error: ', err);
        res.status(500).send({ error: 'Internal Server Error !' });
    };

}


function displayBrand(req, res) {
    const id = req.params.id;
    brandService.displayBrand(this.mysql, id)
        .then((result) => {
            if (!result) {
                res.status(404).send({ error: 'Not Found' });
            }
            return brandService.getOne(this.mysql, id);

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


function createBanner(req, res) {
    const data = req.body;
    bannerService.createBanner(this.mysql, data)
        .then((result) => {
            const id = result.insertId;
            return bannerService.getOne(this.mysql, id);
        })
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            console.error('Database Error: ', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


function updateConfig(req, res) {
    const data = req.body;
    const id = req.params.id;
    configService.updateConfig(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ Error: 'Not Found' });
                return;
            }
            const item = await configService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch((err) => {
            console.error('Database Error: ' + err.message);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}

module.exports = {
    getConfig,
    getOne,
    updateConfig,

    

    
};