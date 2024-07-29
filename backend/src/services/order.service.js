
// lay ds don hang theo user_id
const getOrderByUserIdPagination = async (db, user_id, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT 
        (SELECT COUNT(*) FROM orders o WHERE o.customer_id = ? AND o.status = 1) as qty_no_delivery,
        (SELECT COUNT(*) FROM orders o WHERE o.customer_id = ? AND o.status = 3) as qty_are_delivery,
        (SELECT COUNT(*) FROM orders o WHERE o.customer_id = ? AND o.status = 4) as qty_delivered,
        (SELECT COUNT(*) FROM orders o WHERE o.customer_id = ? AND o.status IN (1,2,3, 4)) as qty_order
        FROM orders WHERE customer_id = ?`, [user_id, user_id, user_id, user_id, user_id],
            (err, qty) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (qty.length === 0) {
                    resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } }, qty: 0, qty_no_delivery: 0, qty_are_delivery: 0, qty_delivered: 0 })
                } else {
                    db.query(`SELECT p.image, o.created_at, p.name, p.id
                    FROM order_detail od
                    JOIN orders o ON o.id = od.order_id
                    JOIN products p ON p.id = od.product_id
                    WHERE o.customer_id = ? AND o.status = 3
                    ORDER BY o.created_at DESC 
                    LIMIT ?,?`, [user_id, (page - 1) * limit, limit],
                        (err, result) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            console.log(result);
                            if (result.length === 0) {
                                resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } }, qty: qty[0].qty_order, qty_no_delivery: qty[0].qty_no_delivery, qty_are_delivery: qty[0].qty_are_delivery, qty_delivered: qty[0].qty_delivered })
                            }
                            else {
                                const total = qty[0].qty_delivered;
                                const pageCount = Math.ceil(total / limit);

                                resolve({
                                    data: result, meta: {
                                        pagination: {
                                            page: parseInt(page, 10),
                                            pageSize: parseInt(limit, 10),
                                            pageCount,
                                            total,
                                        }
                                    }, qty: qty[0].qty_order, qty_no_delivery: qty[0].qty_no_delivery, qty_are_delivery: qty[0].qty_are_delivery, qty_delivered: qty[0].qty_delivered
                                })

                            }
                        })

                }
            })
    }
    )
}


// lay ds tat ca don hang theo user_id co phan trang
const getAllOrderByUserIdPagination = async (db, user_id, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) as qty
        FROM orders o
        JOIN customer c ON c.id = o.customer_id
        WHERE o.customer_id = ? AND o.status != 0
        `, [user_id], (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            db.query(`SELECT p.image, p.name as name_pro, p.id as id_pro, 
            o.status as order_status, o.id as order_id, o.created_at as order_date, c.name, c.phone, c.email, c.address, o.note, o.shipping_methods,
            od.price, od.qty
            FROM order_detail od
            JOIN orders o ON o.id = od.order_id
            JOIN products p ON p.id = od.product_id 
            JOIN customer c ON c.id = o.customer_id
            WHERE o.customer_id = ? AND o.status != 0
            ORDER BY o.created_at DESC 
            LIMIT ?,?`, [user_id, (page - 1) * limit, limit],
                (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    // Tạo một mảng mới để lưu kết quả
                    const orders = [];

                    // Lặp qua các kết quả từ câu truy vấn
                    results.forEach(row => {
                        // Kiểm tra xem order_id đã tồn tại trong mảng orders hay chưa
                        const existingOrderIndex = orders.findIndex(order => order.id === row.order_id);
                        const total = 0;
                        if (existingOrderIndex !== -1) {
                            // Nếu order_id đã tồn tại, cập nhật thông tin khác của order
                            orders[existingOrderIndex].status = row.order_status;
                            orders[existingOrderIndex].created_at = row.order_date;
                            orders[existingOrderIndex].phone = row.phone;
                            orders[existingOrderIndex].email = row.email;
                            orders[existingOrderIndex].address = row.address;
                            orders[existingOrderIndex].note = row.note;
                            orders[existingOrderIndex].shipping_methods = row.shipping_methods;
                            orders[existingOrderIndex].total += row.qty * row.price;
                            // Thêm sản phẩm vào mảng products của order đó
                            orders[existingOrderIndex].products.push({
                                id: row.id_pro,
                                name: row.name_pro,
                                price: row.price,
                                qty: row.qty,
                                image: row.image,
                                total: row.qty * row.price
                            });
                        } else {
                            // Nếu order_id chưa tồn tại, tạo một đối tượng order mới và thêm vào mảng orders
                            const newOrder = {
                                id: row.order_id,
                                name: row.name,
                                products: [{
                                    id: row.id_pro,
                                    name: row.name_pro,
                                    price: row.price,
                                    qty: row.qty,
                                    image: row.image,
                                    total: row.qty * row.price
                                }],
                                // Copy các thuộc tính khác của order từ kết quả truy vấn
                                status: row.order_status,
                                created_at: row.order_date,
                                phone: row.phone,
                                email: row.email,
                                address: row.address,
                                note: row.note,
                                shipping_methods: row.shipping_methods,
                                total: row.qty * row.price
                            };
                            orders.push(newOrder);
                        }
                    });

                    // Tạo đối tượng meta chứa thông tin về phân trang
                    const meta = {
                        pagination: {
                            page: parseInt(page),
                            pageSize: parseInt(limit),
                            pageCount: Math.ceil(res[0].qty / limit),
                            total: res[0].qty
                        }
                    };

                    // Tạo đối tượng data chứa thông tin về đơn hàng và sản phẩm
                    const data = {
                        data: orders,
                        meta: meta
                    };

                    // Trả về đối tượng data
                    console.log(data);
                    resolve(data);
                });

        })
    });
};

// tao don hang
const create = async (db, { customer_id, note, shipping_methods, status, products, price, qty }) => {
    return new Promise((resolve, reject) => {
        const createdAt = new Date();
        db.query(`INSERT INTO orders (customer_id, note, shipping_methods, status, created_at) VALUES (?, ?, ?, ?, ?)`, [customer_id, note, shipping_methods, status, createdAt],
            (err, order) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(order.insertId);
                for (let i = 0; i < products.length; i++) {
                    db.query(`INSERT INTO order_detail (order_id, product_id, price, qty) VALUES (?, ?, ?, ?)`, [order.insertId, products[i], price[i], qty[i]]);
                }
                resolve(order);

            });
    })
}

// chi tiet don hang
const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT o.*, c.name, c.email, c.phone, c.address
             FROM orders o
             JOIN customer c ON c.id = o.customer_id 
            WHERE o.id = ?`, [id]
            , (err, order) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (order.length === 0) {
                    resolve(null);
                }
                console.log(order[0]);
                db.query(`SELECT od.*, p.name, p.image
                        FROM orders o
                        JOIN order_detail od ON od.order_id = o.id
                        JOIN products p ON p.id = od.product_id
                        WHERE o.id = ?`, [id],
                    (err, order_detail) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        console.log(order_detail);
                        resolve({ order: order[0], order_detail: order_detail });
                    })
            });
    });
}


// tat ca don hang
const getAll = async (db, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(` SELECT 
                    (SELECT COUNT(*) FROM orders WHERE status = 0 ) AS qty_cancel,
                    (SELECT COUNT(*) FROM orders WHERE status != 0) AS qty_orders`,
            (err, qty) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.query(`SELECT o.id, o.status, o.note, o.shipping_methods, c.name, c.phone, c.email, c.address
                FROM orders o
                JOIN customer c ON c.id = o.customer_id
                WHERE o.status != 0 
                ORDER BY o.created_at DESC
                LIMIT ?, ?`, [(page - 1) * limit, limit],
                    (err, orders) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (orders.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } }, qty_cancel: qty[0].qty_cancel })
                        }
                        const total = qty[0].qty_orders;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: orders,
                            meta: {
                                pagination: {
                                    page: parseInt(page, 10),
                                    pageSize: parseInt(limit, 10),
                                    pageCount,
                                    total
                                }
                            },
                            qty_cancel: qty[0].qty_cancel
                        }
                        )
                    })

            })
    });
}

// ds don hang bi huy
const getAllOrderCancel = async (db, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(` SELECT 
                    (SELECT COUNT(*) FROM orders WHERE status = 0 ) AS qty_cancel`,
            (err, qty) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.query(`SELECT o.id, o.status, o.note, o.shipping_methods, c.name, c.phone, c.email, c.address
                FROM orders o
                JOIN customer c ON c.id = o.customer_id
                WHERE o.status = 0 
                ORDER BY o.created_at DESC
                LIMIT ?, ?`, [(page - 1) * limit, limit],
                    (err, orders) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (orders.length === 0) {
                            resolve({ data: [], meta: { pagination: { page, pageSize: limit, pageCount: 0, total: 0 } } })
                        }
                        const total = qty[0].qty_cancel;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: orders,
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
                    })

            })
    });
}

// cap nhat trang thai don hang
const updateStatusOrder = async (db, { status }, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE orders SET status = ? WHERE id = ?`, [status, id],
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.affectedRows === 0) {
                    resolve({ message: 'Đã xảy ra lỗi. Hãy thử lại sau !', success: 'false' })
                    return;
                }
                resolve({ message: 'Cập nhật trạng thái đơn hàng thành công !', success: 'true' })
            }
        )
    })
}

module.exports = {
    getOrderByUserIdPagination,
    getAllOrderByUserIdPagination,
    create,
    getOne,
    getAll,
    getAllOrderCancel,
    updateStatusOrder,


}