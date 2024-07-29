const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT s.*
            FROM roles s 
            `
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve(null);
                }
                resolve(res);
            });
    });
}


module.exports = {
    getAll,
    
}