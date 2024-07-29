const unicodeit = require('unicodeit');

const slugify = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Xóa các ký tự không phải chữ cái, số và khoảng trắng
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
      .trim(); // Xóa khoảng trắng ở đầu và cuối chuỗi
  };

const getAll = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT t.*, p.name AS parent_name,
            (SELECT COUNT(*) FROM topic WHERE status = 0) AS qty_trash,
            (SELECT COUNT(*) FROM topic WHERE status != 0) AS qty_topic
            FROM topic t
            LEFT JOIN topic p ON t.parent_id = p.id
            WHERE t.status != 0 ORDER BY t.created_at DESC
             `
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve({ data: [], qty_trash: 0, qty_topic: 0 });
                }
                resolve({ data: res, qty_trash: res[0].qty_trash, qty_topic: res[0].qty_topic });
            });
    });
}


const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT c.*, p.name AS parent_name
             FROM topic c
             LEFT JOIN topic p ON c.parent_id = p.id
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

//
const getByParentId = async (db, parent) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM topic WHERE parent_id = ? AND status = 1`, [parent], (err, res) => {
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


const createTopic = async (db, { name, description, parent_id, status }) => {
    return new Promise((resolve, reject) => {

        const createdAt = new Date().toISOString();
        const formattedSlug = slugify(name);

        db.query(
            `INSERT INTO topic (name, slug, parent_id, description, created_at, status) VALUES (?, ?, ?, ?, ?, ?)`,
            [name, formattedSlug, parent_id, description, createdAt, status],
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


const updateTopic = async (db, { name, description, parent_id, status }, id) => {

    return new Promise((resolve, reject) => {

        const formattedSlug = slugify(name);
        const updatedAt = new Date().toISOString();

        db.query(
            `UPDATE topic SET name = ?, slug = ?, parent_id = ?, description = ? , updated_at = ? , status = ? WHERE id = ?`,
            [name, formattedSlug, parent_id, description, updatedAt, status, id],
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


const trashTopic = async (db, id) => {
    return new Promise((resolve, reject) => {

        db.query(`SELECT COUNT(*) as count FROM post WHERE topic_id = ?`, [id], (err, res) => {
            if (err) {
                console.error('Error:', err.message);
                return reject(err);
            }

            const postCount = res[0].count;

            if (postCount > 0) {
                resolve({ success: true, message: 'Không thể xóa chủ đề này vì có bài viết liên quan', data: null });
            } else {
                db.query(`UPDATE topic SET status = 0 WHERE id = ?`, [id], (err, res) => {
                    if (err) {
                        console.error('Error:', err.message);
                        return reject(err);
                    }

                    if (res.affectedRows === 0) {
                        resolve({ success:false , message: 'Không tìm thấy dữ liệu' });
                    }

                    resolve({ data: res, success: true, message: 'Đã xóa dữ liệu vào thùng rác !' });
                });
            }
        });
    });
};


const rescoverTrashTopic = async (db, id) => {

    return new Promise((resolve, reject) => {

        db.query(`UPDATE topic SET status = 2 WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (res.affectedRows === 0) {
                    resolve({ Error: 'Topic not found' });
                }
                resolve(res);
            }
        )
    })
}


const getListTrash = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT c.*, p.name AS parent_name
            FROM topic c
            LEFT JOIN topic p ON c.parent_id = p.id
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



const displayTopic = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT status FROM topic WHERE id = ?`, [id],
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

                    db.query(`UPDATE topic SET status = ? WHERE id = ?`, [newStatus, id],
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


const deleteTopic = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM topic WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error: ', err.message);
                    return reject;
                }
                if(res.affectedRows === 0) {
                    resolve({Error: 'Topic not found'});
                }
                else {
                    resolve({message: 'Topic deleted successfully'})
                }
            }
        )
    });
}


module.exports = {
    getAll,
    getOne,
    getByParentId,
    createTopic,
    updateTopic,
    trashTopic,
    rescoverTrashTopic,
    getListTrash,
    displayTopic,
    deleteTopic,





};