
const getConfig = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM info`
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(res);
                if (res.length === 0) {
                    resolve(null);
                }
                resolve(res[0]);
            });
    });
}


const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT *
             FROM info
            WHERE id = ?`, [id]
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve(null);
                }
                resolve(res[0]);
            });
    });
}


const createConfig = async (db, { author, email, logo, phone, zalo, youtobe, facebook, address ,status }) => {
    return new Promise((resolve, reject) => {

        const createdAt = new Date();

        db.query(
            `INSERT INTO info (author, email, logo, phone, zalo, youtobe, facebook, address, status, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
            [author, email, logo, phone, zalo, youtobe, facebook, address, status, createdAt],
            (err, results) => {
                if (err) {
                    console.error('Validation error: ', err.message);
                    return reject(err);
                }
                resolve(results);
            }
        );
    });
}


const updateConfig = async (db, { author, email, logo, phone, zalo, youtobe, facebook, address ,status }, id) => {
    return new Promise((resolve, reject) => {

        const updatedAt = new Date();

        db.query(
            `UPDATE info SET author = ?, email = ?, logo = ?, phone = ?, zalo = ?, youtobe = ?, facebook = ?, address = ?, status = ?, updated_at = ? WHERE id = ?`,
            [author, email, logo, phone, zalo, youtobe, facebook, address ,status, updatedAt, id],
            (err, results) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (results.affectedRows === 0) {
                    resolve({ Error: 'Info not found' });
                }
                resolve(results);
            }
        );

    })
}

module.exports = {
    getConfig,
    createConfig,
    getOne,
    updateConfig,



};