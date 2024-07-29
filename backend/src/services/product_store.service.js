const createImport = async (db, { product_id, qty }) => {
    return new Promise((resolve, reject) => {

        const createdAt = new Date();

        db.query(`SELECT * FROM product_store WHERE product_id = ?`, [product_id],
            (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (results.length > 0) {
                    db.query(
                        `UPDATE product_store SET qty = ?, updated_at = ? , updated_by = ? WHERE product_id = ?`,
                        [qty, createdAt, 1, product_id],
                        (err, results_1) => {
                            if (err) {
                                console.error('Error:', err.message);
                                return reject(err);
                            }
                            if (results_1.affectedRows === 0) {
                                resolve({message: 'Cập nhật dữ liệu thất bại !', success :'false'});
                            }
                            resolve({message: 'Cập nhật dữ liệu thành công !', success :'true'});
                        }
                    );

                }
                else {
                    db.query(
                        `INSERT INTO product_store (product_id, qty, qty_sold, created_at, created_by) VALUES (?, ?, ?, ?, 1)`,
                        [product_id, qty, 0, createdAt],
                        (err, results_2) => {
                            if (err) {
                                console.error('Validation error: ', err.message);
                                return reject(err);
                            }
                            if (results_2.affectedRows === 0) {
                                resolve({message: 'Thêm dữ liệu thất bại !', success :'false'});
                            }
                            resolve({message: 'Thêm dữ liệu thành công !', success :'true'});
                        }
                    );

                }
            }
        )
    });
}

const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM product_store WHERE id = ? `,[id], 
            (err, results) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(results);
            }
        )
    })
}

module.exports = {
    createImport,
    getOne,


}