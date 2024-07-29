const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Xóa các ký tự không phải chữ cái và số, thay thế bằng dấu gạch ngang
        .replace(/^-+|-+$/g, '');  // Xóa dấu gạch ngang ở đầu và cuối chuỗi
};


const getAll = async (db, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT
                    (SELECT COUNT(*) FROM discounted_products WHERE status != 0) AS total,
                    (SELECT COUNT(*) FROM discounted_products WHERE status = 0) AS qty_trash
                FROM discounted_products WHERE status != 0`,
            (err, countResult) => {
                if (err) {
                    reject(err);
                    return;
                }
                // resolve(countResult)
                db.query(
                    `SELECT dp.id, dp.product_id, dp.sale_id, dp.start_time, dp.end_time, dp.status, p.name as name_pro, p.image,s.name as title_sale, (p.price - (p.price * s.percent_sale / 100)) as price_sale, p.price
                    FROM discounted_products dp
                    JOIN sale s ON s.id = dp.sale_id
                    JOIN products p ON p.id = dp.product_id
                    WHERE dp.status != 0
                    ORDER BY dp.created_at DESC
                    LIMIT ?, ?`,
                    [(page - 1) * limit, limit],
                    (err, products) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (products.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                        }
                        console.log(products);

                        const total = countResult[0].total;
                        const qty_trash = countResult[0].qty_trash;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: products,
                            meta: {
                                pagination: {
                                    page: parseInt(page, 10),
                                    pageSize: parseInt(limit, 10),
                                    pageCount,
                                    total,
                                    qty_trash
                                }
                            }
                        }
                        )
                    }
                )
            })
    })
}


const getProductSaleLimit = async (db, limit) => {

    return new Promise((resolve, reject) => {
        db.query(
            `SELECT dp.id, dp.product_id, dp.sale_id, dp.start_time, dp.end_time, dp.status,
             p.name AS name_pro, p.image, p.slug, p.price, (p.price - (p.price * s.percent_sale / 100)) as price_sale, s.name AS title_sale, s.description as percent_sale
            FROM discounted_products dp
            JOIN sale s ON s.id = dp.sale_id
            JOIN products p ON p.id = dp.product_id
            WHERE dp.status = 1 AND NOW() BETWEEN dp.start_time AND dp.end_time
            ORDER BY dp.created_at DESC
            LIMIT ?`, [parseInt(limit)],
            (err, products) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (products.length === 0) {
                    resolve({ data: [] })
                }
                console.log(products);
                resolve({ data: products }
                )
            }
        )

    })
}


const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT p.id as product_id, p.name, p.image,
             p.price, dp.created_at, dp.updated_at, dp.created_by, dp.updated_by, dp.status,
             c.category_name AS nameCat, b.name AS nameBrand, dp.start_time, dp.end_time, (p.price - (p.price * s.percent_sale / 100)) as price_sale
             , s.name as title_sale, s.percent_sale
             FROM discounted_products dp
             LEFT JOIN products p ON dp.product_id = p.id
             LEFT JOIN categories c ON c.id = p.category_id
             LEFT JOIN brand b ON b.id = p.brand_id
             LEFT JOIN sale s ON s.id = dp.sale_id
            WHERE dp.product_id = ?`, [id]
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


const createDiscountedPro = async (db, { product_id, sale_id, start_time, end_time , qty, status }) => {
    return new Promise((resolve, reject) => {

        const createdAt = new Date();


        db.query(
            `INSERT INTO discounted_products (product_id, sale_id, start_time, end_time, qty, status, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
            [product_id, sale_id, start_time, end_time, qty, status, createdAt],
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


const getTrash = async (db, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) as qty_trash FROM discounted_products WHERE status = 0`,
            (err, countResult) => {
                if (err) {
                    reject(err);
                    return;
                }
                // resolve(countResult)
                db.query(
                    `SELECT dp.id, dp.product_id, dp.sale_id, dp.start_time, dp.end_time, dp.status, p.name as name_pro, p.image,s.name as title_sale, (p.price - (p.price * s.percent_sale / 100)) as price_sale, p.price
                    FROM discounted_products dp
                    JOIN sale s ON s.id = dp.sale_id
                    JOIN products p ON p.id = dp.product_id
                    WHERE dp.status = 0
                    ORDER BY dp.created_at DESC
                    LIMIT ?, ?`,
                    [(page - 1) * limit, limit],
                    (err, products) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (products.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                        }
                        console.log(products);

                        const total = countResult[0].qty_trash;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: products,
                            meta: {
                                pagination: {
                                    page: parseInt(page, 10),
                                    pageSize: parseInt(limit, 10),
                                    pageCount,
                                    total
                                }
                            }
                        }
                        )
                    }
                )
            })
    })
}


const rescoverTrash = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE discounted_products SET status = 2 WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (res.affectedRows === 0) {
                    resolve({ message: 'Không tìm thấy dữ liệu !', success: 'false' });
                }
                resolve({ message: 'Phục hồi thành công !', success: 'true' });
            }
        )
    })
}


const trashPro = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE discounted_products SET status = 0 WHERE id = ?`, [id],
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
    })
}


const displayDiscountedPro = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT status FROM discounted_products WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }

                if (res.length === 0) {
                    resolve({ message: 'Không tìm thấy dữ liệu', success: 'false' });
                } else {
                    const currentStatus = res[0].status;
                    const newStatus = currentStatus === 1 ? 2 : 1;

                    db.query(`UPDATE discounted_products SET status = ? WHERE id = ?`, [newStatus, id],
                        (err, updateRes) => {
                            if (err) {
                                console.error('Error:', err.message);
                                return reject(err);
                            }

                            if (updateRes.affectedRows === 0) {
                                resolve({ message: 'Cập nhật thất bại !', success:'false' });
                            } else {
                                resolve({ message: 'Cập nhật thành công', success:'true' });
                            }
                        }
                    );
                }
            }
        );
    });
};


const deletePro = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM discounted_products WHERE id = ?`, [id],
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


const updateDiscountedPro = async (db, { product_id, sale_id, start_time, end_time , qty, status, updated_by }, id) => {
    return new Promise((resolve, reject) => {

        const updateAt = new Date();


        db.query(
            `UPDATE discounted_products SET product_id = ?, sale_id  = ? , start_time = ?, end_time = ?, qty = ?, status = ?, updated_at = ?, updated_by = ? WHERE id = ?`,
            [product_id, sale_id, start_time, end_time, qty, status, updateAt, updated_by, id],
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


const getById = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM discounted_products WHERE id = ?`,[id],
            (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(results[0]);
            }
        )
    })
}

module.exports = {
    getAll,
    getProductSaleLimit,
    getOne,
    createDiscountedPro,
    getTrash,
    rescoverTrash,
    trashPro,
    displayDiscountedPro,
    deletePro,
    updateDiscountedPro,
    getById,





};