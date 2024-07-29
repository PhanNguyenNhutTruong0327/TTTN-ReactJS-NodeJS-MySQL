const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Xóa các ký tự không phải chữ cái và số, thay thế bằng dấu gạch ngang
        .replace(/^-+|-+$/g, '');  // Xóa dấu gạch ngang ở đầu và cuối chuỗi
};



const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT c.*, p.category_name AS parent_name,
            (SELECT COUNT(*) FROM categories WHERE status = 0) AS qty_trash,
            (SELECT COUNT(*) FROM categories WHERE status != 0) AS qty_categories
            FROM categories c
            LEFT JOIN categories p ON c.parent = p.id
            WHERE c.status != 0 ORDER BY c.created_at DESC `
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve({ data: res, qty_trash: 0, qty_categories: 0 });
                }
                resolve({ data: res, qty_trash: res[0].qty_trash, qty_categories: res[0].qty_categories });
            });
    });
}


const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT c.*, p.category_name AS parent_name
             FROM categories c
             LEFT JOIN categories p ON c.parent = p.id
            WHERE c.id = ?`, [id]
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


const getByParent = async (db, parent) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM categories WHERE parent = ? AND status = 1 ORDER BY sort_order ASC`, [parent], (err, res) => {
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


const createCategory = async (db, { category_name, slug, sort_order, parent, status }) => {
    return new Promise((resolve, reject) => {

        const createdAt = Date.now();
        const formattedSlug = slugify(category_name);


        db.query(
            `INSERT INTO categories (category_name, slug, sort_order, parent, status, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
            [category_name, formattedSlug, sort_order, parent, status, createdAt],
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


const updateCategory = async (db, { category_name, sort_order, parent, status }, id) => {
    return new Promise((resolve, reject) => {

        const formattedSlug = slugify(category_name);

        db.query(
            `UPDATE categories SET category_name = ?, slug = ?, sort_order = ?, parent = ?, status = ? WHERE id = ?`,
            [category_name, formattedSlug, sort_order, parent, status, id],
            (err, results) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (results.affectedRows === 0) {
                    resolve({ Error: 'Category not found' });
                }
                resolve(results);
            }
        );

    })
}


const trashCategory = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) as qty FROM products WHERE category_id = ?`, [id],
            (err, qty_pro) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (qty_pro[0].qty > 0) {
                    resolve({ message: 'Danh mục đang có sản phẩm không thể xóa !', success: 'false' });
                }
                else {
                    db.query(`UPDATE categories SET status = 0 WHERE id = ?`, [id],
                        (err, res) => {
                            if (err) {
                                console.error('Error:', err.message);
                                return reject(err);
                            }
                            if (res.affectedRows === 0) {
                                resolve({ message: 'Không tìm thấy dữ liệu !', success: 'false' });
                            }
                            else {
                                resolve({ message: 'Đã thêm dữ liệu vào thùng rác !', success: 'true' });
                            }
                        }
                    )

                }
            }
        )
    })
}


const rescoverTrashCategory = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE categories SET status = 2 WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (res.affectedRows === 0) {
                    resolve({ Error: 'Category not found' });
                }
                resolve(res);
            }
        )
    })
}


const getListTrash = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT c.*, p.category_name AS parent_name
            FROM categories c
            LEFT JOIN categories p ON c.parent = p.id
            WHERE c.status = 0 ORDER BY c.created_at DESC `
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


const displayCategory = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT status FROM categories WHERE id = ?`, [id],
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

                    db.query(`UPDATE categories SET status = ? WHERE id = ?`, [newStatus, id],
                        (err, updateRes) => {
                            if (err) {
                                console.error('Error:', err.message);
                                return reject(err);
                            }

                            if (updateRes.affectedRows === 0) {
                                resolve({ Error: 'Failed to update category status' });
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


const deleteCategory = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM categories WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error: ', err.message);
                    return reject;
                }
                if (res.affectedRows === 0) {
                    resolve({ Error: 'Category not found' });
                }
                else {
                    resolve({ message: 'Category deleted successfully' })
                }
            }
        )
    });
}



module.exports = {
    getAll,
    getOne,
    getByParent,
    createCategory,
    updateCategory,
    trashCategory,
    rescoverTrashCategory,
    getListTrash,
    displayCategory,
    deleteCategory,


};