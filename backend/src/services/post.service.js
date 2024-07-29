const topic = require("../routes/topic/topic");

const slugify = (str) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Xóa các ký tự không phải chữ cái và số, thay thế bằng dấu gạch ngang
        .replace(/^-+|-+$/g, '');  // Xóa dấu gạch ngang ở đầu và cuối chuỗi
};



const getAll = async (db, type, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT 
                (SELECT COUNT(*) FROM post WHERE status = 0 AND type = ?) AS qty_trash,
                (SELECT COUNT(*) FROM post WHERE status != 0 AND type = ?) AS qty
            FROM post p
            LEFT JOIN topic t ON t.id = p.topic_id
            WHERE p.status != 0 AND type = ? `, [type, type, type],
            (err, qty) => {
                if (err) {
                    reject(err);
                    return;
                }
                db.query(
                    `SELECT p.*, t.name as name_topic
                    FROM post p 
                    LEFT JOIN topic t ON t.id = p.topic_id
                    WHERE p.status != 0 AND type = ? 
                    ORDER BY p.created_at DESC
                    LIMIT ?,?`, [type, (page - 1) * limit, limit]
                    , (err, res) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        console.log(res);
                        if (res.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: qty[0].qty, qty_trash: qty[0].qty_trash } } });
                            return;
                        }
                        const total = qty[0].qty;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: res,
                            meta: {
                                pagination: {
                                    page: parseInt(page, 10),
                                    pageSize: parseInt(limit, 10),
                                    pageCount,
                                    total,
                                    qty_trash: qty[0].qty_trash

                                }
                            },
                        }
                        )
                    });

            })
    });
}


const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT p.*, t.name as name_topic, uu.name as updated_name, uc.name  as created_name
             FROM post p
             LEFT JOIN topic t ON t.id = p.topic_id
             JOIN user uc ON uc.id = p.created_by
             LEFT JOIN user uu ON uu.id = p.updated_by
            WHERE  p.id= ?`, [id]
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


const getPostNew = async (db, page, limit) => {
    console.log(page, limit);
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) as qty FROM post WHERE status = 1 AND type = 'news'`,
            (err, qty) => {
                if (err) {
                    reject(err);
                    return;
                }
                db.query(`SELECT * FROM post WHERE status = 1 AND type = 'news' ORDER BY created_at DESC LIMIT ?,?`, [(page - 1) * limit, limit],
                    (err, res) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (res.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } });
                        }
                        const total = qty[0].qty;
                        const pageCount = Math.ceil(total / limit);

                        console.log(res);
                        resolve({
                            data: res,
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
                    });

            })
    });
}


const trashPost = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE post SET status = 0 WHERE id = ?`, [id],
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


const rescoverTrash = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE post SET status = 2 WHERE id = ?`, [id],
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


const getListTrash = async (db, type, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT p.*, t.name as name_topic
            FROM post p 
            LEFT JOIN topic t ON t.id = p.topic_id
            WHERE p.status = 0 AND type = ? 
            ORDER BY p.created_at DESC
            LIMIT ?,?`, [type, (page - 1) * limit, limit]
            , (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(res);
                if (res.length === 0) {
                    resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                }
                const total = res.length;
                const pageCount = Math.ceil(total / limit);
                resolve({
                    data: res,
                    meta: {
                        pagination: {
                            page: parseInt(page, 10),
                            pageSize: parseInt(limit, 10),
                            pageCount,
                            total

                        }
                    },
                }
                )
            });
    });
}


const displayPost = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT status FROM post WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }

                if (res.length === 0) {
                    resolve({ message: 'Không tìm thấy dữ liệu' });
                } else {
                    const currentStatus = res[0].status;
                    const newStatus = currentStatus === 1 ? 2 : 1;

                    db.query(`UPDATE post SET status = ? WHERE id = ?`, [newStatus, id],
                        (err, updateRes) => {
                            if (err) {
                                console.error('Error:', err.message);
                                return reject(err);
                            }

                            if (updateRes.affectedRows === 0) {
                                resolve({ message: 'Failed to update post status', success: 'false' });
                            } else {
                                resolve({ message: 'Cập nhật thành công', success: 'true' });
                            }
                        }
                    );
                }
            }
        );
    });
};


const deletePost = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM post WHERE id = ?`, [id],
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


const createPost = async (db, { topic_id, title, description_1, description_2, description_3, image_1, image_2, image_3, type, status, created_by }) => {
    return new Promise((resolve, reject) => {

        const formattedSlug = slugify(title);
        const createdAt = new Date();

        db.query(
            `INSERT INTO post (topic_id, title, slug, description_1, description_2, description_3, image_1, image_2, image_3, type, status, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [topic_id, title, formattedSlug, description_1, description_2, description_3, image_1, image_2, image_3, type, status, createdAt, created_by],
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


const updatePost = async (db, { topic_id, title, description_1, description_2, description_3, image_1, image_2, image_3, type, status, updated_by }, id) => {
    return new Promise((resolve, reject) => {

        const formattedSlug = slugify(title);
        const updatedAt = new Date();

        db.query(
            `UPDATE post SET topic_id = ?, title = ? ,slug = ?, description_1 = ?, description_2 = ?, description_3 = ?, image_1 = ?, image_2 = ?, image_3 = ?, type = ?, status = ?, updated_at = ? , updated_by = ? WHERE id = ?`,
            [topic_id, title, formattedSlug, description_1, description_2, description_3, image_1, image_2, image_3, type, status, updatedAt, updated_by, id],
            (err, results) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (results.affectedRows === 0) {
                    resolve({ Error: 'Post not found' });
                }
                resolve(results);
            }
        );

    })
}


const getPostBySlugTopic = async (db, slug, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT p.*, t.name as name_topic
            FROM post p 
            LEFT JOIN topic t ON t.id = p.topic_id
            WHERE p.status = 1 AND p.type = 'news' AND t.slug = ? 
            ORDER BY p.created_at DESC
            `, [slug]
            , (err, qty) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (qty.length === 0) {
                    resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                }
                db.query(
                    `SELECT p.*, t.name as name_topic
                    FROM post p 
                    LEFT JOIN topic t ON t.id = p.topic_id
                    WHERE p.status = 1 AND p.type = 'news' AND t.slug = ? 
                    ORDER BY p.created_at DESC
                    LIMIT ?,?`, [slug, (page - 1) * limit, limit]
                    , (err, res) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        console.log(res);
                        if (res.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                        }
                        const total = qty.length;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: res,
                            meta: {
                                pagination: {
                                    page: parseInt(page, 10),
                                    pageSize: parseInt(limit, 10),
                                    pageCount,
                                    total,

                                }
                            },
                        }
                        )
                    });

            });
    });
}


const getDetailPostBySlugAndPostOther = async (db, slug) => {

    return new Promise((resolve, reject) => {
        db.query(
            `SELECT p.*
            FROM post p
            LEFT JOIN topic t ON t.id = p.topic_id
            WHERE p.slug = ?`, [slug],
            (err, post) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (post.length === 0) {
                    resolve({ data: [], postOther: [] })
                }
                const listid = [post[0].topic_id];
                db.query(`SELECT * FROM topic WHERE status = 1 AND parent_id = ?`, [post[0].topic_id],
                    (err, topics) => {
                        if (err) {
                            reject(err);
                            return;
                        }


                        if (topics.length > 0) {
                            for (const row1 of topics) {
                                listid.push(row1.id);
                                db.query(`SELECT * FROM topic WHERE parent_id = ? AND status = 1`), [row1.id],
                                    (err, countResult2) => {
                                        if (err) {
                                            reject(err);
                                            return;
                                        }
                                        if (countResult2.length > 0) {
                                            for (const row2 of countResult2) {
                                                listid.push(row2.id);
                                            }
                                        }
                                    }
                            }
                        }

                        db.query(`SELECT p.* , t.name as name_topic
                        FROM post p
                        JOIN topic t ON t.id = p.topic_id 
                        WHERE p.id != ? AND p.status = 1 AND p.topic_id IN (?) 
                        LIMIT 6`, [post[0].id, listid],
                            (err, postOther) => {
                                if (err) {
                                    reject(err);
                                    return;
                                }
                                if (postOther.length === 0) {
                                    resolve({ data: post[0], postOther: [] })
                                }
                                resolve({ data: post[0], postOther: postOther })

                            }
                        )

                    }
                )


            })

    })

}

module.exports = {
    getPostNew,
    getAll,
    getOne,
    trashPost,
    displayPost,
    rescoverTrash,
    getListTrash,
    deletePost,
    createPost,
    getPostBySlugTopic,
    getDetailPostBySlugAndPostOther,
    updatePost: updatePost,



};