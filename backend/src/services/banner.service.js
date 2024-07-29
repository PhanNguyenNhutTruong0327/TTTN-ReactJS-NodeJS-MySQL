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
            (SELECT COUNT(*) FROM banner WHERE status = 0) AS qty_trash,
            (SELECT COUNT(*) FROM banner WHERE status != 0) AS qty
            FROM banner b WHERE b.status != 0 ORDER BY b.created_at DESC `
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve({ data: [], qty_trash: 0, qty: 0 });
                }
                resolve({ data: res, qty_trash: res[0].qty_trash, qty: res[0].qty });
            });
    });
}


const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT b.*, uc.name as created_name, uu.name as updated_name 
             FROM banner b
             JOIN user uc ON b.created_by = uc.id 
             LEFT JOIN user uu ON b.updated_by = uu.id 
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


const getBannerFE = async (db, position) => {
    console.log(position);
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM banner WHERE status = 1 AND position = ?`, [position], (err, res) => {
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


const trashBanner = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE banner SET status = 0 WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (res.affectedRows === 0) {
                    resolve({ message: 'Không tìm thấy dữ liệu !' , success: 'false'});
                }
                resolve({message: 'Đã xóa vào thùng rác !', success:'true'});
            }
        )
    })
}


const rescoverTrashBanner = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE banner SET status = 2 WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (res.affectedRows === 0) {
                    resolve({ message: 'Không tìm thấy dữ liệu !', success: 'false' });
                }
                resolve({message: 'Phục hồi thành công !', success:'true'});
            }
        )
    })
}


const getListTrash = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT b.*
            FROM banner b
            WHERE b.status = 0 ORDER BY b.created_at DESC `
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve({data:[], qty: 0});
                }
                const qty = res.length;
                resolve({data: res, qty: qty});
            });
    });
}


const displayBanner = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT status FROM banner WHERE id = ?`, [id],
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

                    db.query(`UPDATE banner SET status = ? WHERE id = ?`, [newStatus, id],
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


const deleteBanner = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM banner WHERE id = ?`, [id],
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


const createBanner = async (db, { name, description, link, image, position, status, created_by }) => {
    return new Promise((resolve, reject) => {

        const createdAt = new Date();


        db.query(
            `INSERT INTO banner (name, description, link, image, position, status, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, description, link, image, position, status, createdAt, created_by],
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


const updateBanner = async (db, { name, description, link, image, position, status , updated_by}, id) => {
    return new Promise((resolve, reject) => {

        console.log(image);
        const updatedAt = new Date();

        db.query(
            `UPDATE banner SET name = ?, description = ?, link = ?, image = ?, position = ?, status = ?, updated_at = ? , updated_by = ? WHERE id = ?`,
            [name, description, link, image, position, status, updatedAt, updated_by, id],
            (err, results) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (results.affectedRows === 0) {
                    resolve({ Error: 'Banner not found' });
                }
                resolve(results);
            }
        );

    })
}

module.exports = {
    getBannerFE,
    getAll,
    getOne,
    createBanner,
    updateBanner,
    trashBanner,
    trashBanner,
    rescoverTrashBanner,
    getListTrash,
    displayBanner,
    deleteBanner

};