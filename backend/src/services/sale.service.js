const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Xóa các ký tự không phải chữ cái và số, thay thế bằng dấu gạch ngang
        .replace(/^-+|-+$/g, '');  // Xóa dấu gạch ngang ở đầu và cuối chuỗi
};



const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT s.*, (SELECT COUNT(*) FROM sale WHERE status = 0) AS qty_trash,
            (SELECT COUNT(*) FROM sale WHERE status != 0) AS qty_sale
            FROM sale s WHERE s.status != 0 ORDER BY s.created_at DESC`
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve({ data: [], qty_trash: 0, qty_sale: 0 });
                }
                resolve({ data: res, qty_trash: res[0].qty_trash, qty_sale: res[0].qty_sale });
            });
    });
}


const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT s.*, uc.name as created_name, uu.name as updated_name 
            FROM sale s 
            JOIN user uc ON uc.id = s.created_by 
            LEFT JOIN user uu ON uu.id = s.updated_by 
            WHERE s.id = ?`, [id]
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



const createSale = async (db, { name, description, percent_sale, price_sale, status, created_by }) => {
    return new Promise((resolve, reject) => {

        const createdAt = new Date().toISOString();
        const formattedSlug = slugify(name);


        db.query(
            `INSERT INTO sale (name, slug, description, percent_sale, price_sale ,created_at, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, formattedSlug, description, percent_sale, price_sale, createdAt, status, created_by],
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


const updateSale = async (db, { name, description, percent_sale, price_sale, status, updated_by }, id) => {

    return new Promise((resolve, reject) => {

        const formattedSlug = slugify(name);
        const updatedAt = new Date().toISOString();

        db.query(
            `UPDATE sale SET name = ?, slug = ?, description = ? , price_sale = ?, percent_sale = ?, updated_at = ? , status = ?, updated_by = ? WHERE id = ?`,
            [name, formattedSlug, description, price_sale, percent_sale, updatedAt, status, updated_by, id],
            (err, results) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (results.affectedRows === 0) {
                    resolve({ Error: 'Topic not found' });
                }
                resolve(results);
            }
        );

    })
}


const trashSale = async (db, id) => {
    return new Promise((resolve, reject) => {

        db.query(`SELECT COUNT(*) as count FROM discounted_products WHERE sale_id = ?`, [id], (err, res) => {
            if (err) {
                console.error('Error:', err.message);
                return reject(err);
            }

            const qty_pro = res[0].count;

            if (qty_pro > 0) {
                resolve({ success: true, message: 'Không thể xóa chương trình giảm giá này vì đang có sản phẩm', data: null });
            } else {
                db.query(`UPDATE sale SET status = 0 WHERE id = ?`, [id], (err, res) => {
                    if (err) {
                        console.error('Error:', err.message);
                        return reject(err);
                    }

                    if (res.affectedRows === 0) {
                        resolve({ success: false, message: 'Không tìm thấy dữ liệu' });
                    }

                    resolve({ data: res, success: true, message: 'Đã xóa dữ liệu vào thùng rác !' });
                });
            }
        });
    });
};


const rescoverTrashSale = async (db, id) => {

    return new Promise((resolve, reject) => {

        db.query(`UPDATE sale SET status = 2 WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (res.affectedRows === 0) {
                    resolve({ Error: 'Sale not found' });
                }
                resolve(res);
            }
        )
    })
}


const getListTrash = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT 
                s.*,
                (SELECT COUNT(*) FROM sale WHERE status = 0) AS qty_trash
            FROM 
                sale s
            WHERE 
                s.status = 0
            ORDER BY 
                s.created_at DESC`,
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.query(
                    `SELECT COUNT(*) AS qty_trash FROM sale WHERE status = 0`,
                    (countErr, countRes) => {
                        if (countErr) {
                            reject(countErr);
                            return;
                        }

                        const qty_trash = countRes[0].qty_trash;

                        resolve({
                            data: res,
                            qty_trash
                        });
                    }
                );
            }
        );
    });
};

const displaySale = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT status FROM sale WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }

                if (res.length === 0) {
                    resolve({ Error: 'Không tìm thấy dữ liệu' });
                } else {
                    const currentStatus = res[0].status;
                    const newStatus = currentStatus === 1 ? 2 : 1;

                    db.query(`UPDATE sale SET status = ? WHERE id = ?`, [newStatus, id],
                        (err, updateRes) => {
                            if (err) {
                                console.error('Error:', err.message);
                                return reject(err);
                            }

                            if (updateRes.affectedRows === 0) {
                                resolve({ Error: 'Failed to update topic status' });
                            } else {
                                resolve({ message: 'Cập nhật thành công !' });
                            }
                        }
                    );
                }
            }
        );
    });
};


const deleteSale = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM sale WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error: ', err.message);
                    return reject;
                }
                if(res.affectedRows === 0) {
                    resolve({Error: 'Sale not found'});
                }
                else {
                    resolve({message: 'Sale deleted successfully'})
                }
            }
        )
    });
}


const getAllSale = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT s.*
            FROM sale s WHERE s.status = 1 ORDER BY s.created_at DESC`
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve({data: []});
                }
                resolve({data: res});
            });
    });
}

module.exports = {
    getAll,
    getOne,
    getAllSale,
    createSale,
    updateSale,
    trashSale,
    rescoverTrashSale,
    getListTrash,
    displaySale,
    deleteSale,
    






};