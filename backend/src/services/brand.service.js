const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Xóa các ký tự không phải chữ cái và số, thay thế bằng dấu gạch ngang
        .replace(/^-+|-+$/g, '');  // Xóa dấu gạch ngang ở đầu và cuối chuỗi
};



const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT b.*,
            (SELECT COUNT(*) FROM brand WHERE status = 0) AS qty_trash,
            (SELECT COUNT(*) FROM brand WHERE status != 0) AS qty_brand
            FROM brand b WHERE b.status != 0 ORDER BY b.created_at DESC `
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve({ data: [], qty_trash: 0, qty_brand: 0 });
                }
                resolve({ data: res, qty_trash: res[0].qty_trash, qty_brand: res[0].qty_brand });
            });
    });
}


const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT b.*, uc.name as created_name, uu.name as updated_name
             FROM brand b
             JOIN user uc ON uc.id = b.created_by
             LEFT JOIN user uu ON uu.id = b.updated_by
            WHERE b.id = ?`, [id]
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


const getBrandFE = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM brand WHERE status = 1 ORDER BY created_at DESC`, (err, res) => {
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


const trashBrand = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) as qty FROM products WHERE brand_id = ?`, [id],
            (err, qty_pro) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (qty_pro[0].qty > 0) {
                    resolve({ message: 'Thương hiệu đang có sản phẩm không thể xóa !', success: 'false' });
                }
                else {
                    db.query(`UPDATE brand SET status = 0 WHERE id = ?`, [id],
                        (err, res) => {
                            if (err) {
                                console.error('Error:', err.message);
                                return reject(err);
                            }
                            if (res.affectedRows === 0) {
                                resolve({ message: 'Không tìm thấy dữ liệu !', success: 'false' });
                            }
                            resolve({ message: 'Đã xóa vào thùng rác !', success: 'true' });
                        }
                    )

                }
            })
    })
}


const rescoverTrashBrand = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE brand SET status = 2 WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (res.affectedRows === 0) {
                    resolve({ Error: 'Brand not found' });
                }
                resolve(res);
            }
        )
    })
}


const getListTrash = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM brand WHERE status = 0 ORDER BY created_at DESC `
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve(null);
                }
                console.log(res);
                resolve(res);
            });
    });
}


const displayBrand = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT status FROM brand WHERE id = ?`, [id],
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

                    db.query(`UPDATE brand SET status = ? WHERE id = ?`, [newStatus, id],
                        (err, updateRes) => {
                            if (err) {
                                console.error('Error:', err.message);
                                return reject(err);
                            }

                            if (updateRes.affectedRows === 0) {
                                resolve({ Error: 'Failed to update brand status' });
                            } else {
                                resolve({ message: 'Cập nhật thành công' });
                            }
                        }
                    );
                }
            }
        );
    });
};


const deleteBrand = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM brand WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (res.affectedRows === 0) {
                    resolve({ message: 'Không tìm thấy dữ liệu !', success: 'false' });
                }
                else {
                    resolve({ message: 'Xóa dữ liệu thành công !', success: 'true' });

                }
            }
        )
    })

}


const createBrand = async (db, { name, icon, description, status, created_by }) => {
    return new Promise((resolve, reject) => {

        const createdAt = new Date();
        const formattedSlug = slugify(name);

        db.query(
            `INSERT INTO brand (name, slug, icon, description, status, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, formattedSlug, icon, description, status, createdAt, created_by],
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


const updateBrand = async (db, { name, description, icon, status, updated_by }, id) => {
    return new Promise((resolve, reject) => {

        const updatedAt = new Date();
        const formattedSlug = slugify(name);

        db.query(
            `UPDATE brand SET name = ?, slug = ?, icon = ?, description = ?, status = ?, updated_by = ?, updated_at = ? WHERE id = ?`,
            [name, formattedSlug, icon, description, status, updated_by, updatedAt, id],
            (err, results) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (results.affectedRows === 0) {
                    resolve({ Error: 'Brand not found' });
                }
                resolve(results);
            }
        );

    })
}

module.exports = {
    getAll,
    getOne,
    getBrandFE,
    createBrand,
    updateBrand,
    trashBrand,
    getListTrash,
    rescoverTrashBrand,
    deleteBrand,
    displayBrand,


};