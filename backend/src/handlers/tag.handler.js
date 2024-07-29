const tagService = require('../services/tag.service');

function getTagCategory(req, res) {

    tagService.getTagCategory(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}


function getAll(req, res){
    tagService.getAll(this.mysql)
    .then((result)=>{
        res.send(result);
    })
    .catch((err) => {
        console.error('Database Error:', err);
        res.status(500).send({ error: 'Internal Server Error' });

    })
}


function getTag(req, res){
    tagService.getTag(this.mysql)
    .then((result)=>{
        res.send(result);
    })
    .catch((err) => {
        console.error('Database Error:', err);
        res.status(500).send({ error: 'Internal Server Error' });

    })
}


function getTagAndCategory(req, res) {

    tagService.getTagAndCategory(this.mysql)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.error('Database Error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}
module.exports = {
    getTagCategory,
    getAll,
    getTag,
    getTagAndCategory,

    
    

}