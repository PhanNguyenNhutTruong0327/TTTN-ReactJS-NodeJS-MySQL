const bannerService = require('../services/banner.service');

function getAll(req, res) {
    bannerService.getAll(this.mysql)
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
    bannerService.getOne(this.mysql, id)
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

function trashBanner(req, res) {
    const id = req.params.id;
    bannerService.trashBanner(this.mysql, id)
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


function rescoverTrashBanner(req, res) {
    const id = req.params.id;
    bannerService.rescoverTrashBanner(this.mysql, id)
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
    bannerService.getListTrash(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error !' });
        });
}


async function deleteBanner(req, res) {
    const id = req.params.id;
    try {
        const result = await bannerService.deleteBanner(this.mysql, id);
        if(result.error){
            res.status(404).send(result);
        }
        else{
            res.send(result);
        }

    }
    catch (err) {
        console.error('Database Error: ', err);
        res.status(500).send({ error: 'Internal Server Error !' });
    };

}


function displayBanner(req, res) {
    const id = req.params.id;
    bannerService.displayBanner(this.mysql, id)
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


function updateBanner(req, res) {
    const data = req.body;
    const id = req.params.id;
    console.log(data);
    console.log('aaa');
    console.log(id);
    bannerService.updateBanner(this.mysql, data, id)
        .then(async (result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ Error: 'Not Found' });
                return;
            }
            const item = await bannerService.getOne(this.mysql, id);
            res.send(item);
        })
        .catch((err) => {
            console.error('Database Error: ' + err.message);
            res.status(500).send({ Error: 'Internal Server Error' });
        });
}

module.exports = {
    getBannerFE,
    getAll,
    getOne,
    createBanner,
    updateBanner,
    trashBanner,
    rescoverTrashBanner,
    displayBanner,
    getListTrash,
    deleteBanner


};