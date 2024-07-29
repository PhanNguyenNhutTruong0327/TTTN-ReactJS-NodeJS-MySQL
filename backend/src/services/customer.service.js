const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

const getAll = async (db, page, limit) => {
    return new Promise((resolve, reject) => {
        db.query(
            ` SELECT 
                (SELECT COUNT(*) FROM customer WHERE status = 0 ) AS qty_trash,
                (SELECT COUNT(*) FROM customer WHERE status != 0) AS qty_customer`,
            (err, counts) => {
                if (err) {
                    reject(err);
                    return;
                }
                db.query(`         
                    SELECT c.*
                    FROM customer c
                    WHERE c.status != 0
                    ORDER BY c.created_at DESC
                    LIMIT ?, ?`,
                    [(page - 1) * limit, limit],
                    (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (result.length === 0) {
                            resolve(
                                {
                                    data: [],
                                    meta:
                                    {
                                        pagination: { page, pageSize: limit, pageCount: 0, total: 0 }
                                    },
                                    qty_trash: counts[0].qty_trash,
                                    qty_user: counts[0].qty_customer
                                })
                        }

                        const total = counts[0].qty_customer;
                        const pageCount = Math.ceil(total / limit);
                        resolve({
                            data: result,
                            meta: {
                                pagination: {
                                    page: parseInt(page, 10),
                                    pageSize: parseInt(limit, 10),
                                    pageCount,
                                    total
                                }
                            },
                            qty_trash: counts[0].qty_trash,
                            qty_customer: counts[0].qty_customer
                        }
                        )

                    })
            }
        );
    });
};


const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT u.*
             FROM customer u
             WHERE u.id = ?`, [id]
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


const createCustomer = async (db, { name, user_name, phone, email, password, address, status }) => {
    return new Promise((resolve, reject) => {
        const createdAt = new Date().toISOString();

        db.query(
            `SELECT * FROM customer WHERE email = ?`, [email],
            (err, customer) => {
                if (err) {
                    console.error('Validation error: ', err.message);
                    reject(err);
                    return;
                }
                if (customer.length > 0) {
                    resolve({message: "Email đã được đăng ký tài khoản. Hãy thử email khác", success: "false"});
                    return;
                }
                // Mã hóa mật khẩu
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    db.query(
                        `INSERT INTO customer (name, user_name, email, phone, password, created_at, address, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                        [name, user_name, email, phone, hashedPassword, createdAt, address, status],
                        (err, results) => {
                            if (err) {
                                console.error('Validation error: ', err.message);
                                reject(err);
                                return;
                            }

                            resolve({message: "Đăng ký tài khoản thành công !", success: 'true'});
                        }
                    );
                });
            }
        );

    });
};


const updateCustomer = async (db, { name, user_name, phone, email, password, address, status }, id) => {

    return new Promise((resolve, reject) => {

        const updatedAt = new Date().toISOString();

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                reject(err);
                return;
            }


            db.query(
                `UPDATE customer SET name = ?, user_name = ?, phone = ?, email = ? , updated_at = ? , status = ?, address = ? WHERE id = ?`,
                [name, user_name, phone, email, updatedAt, status, address, id],
                (err, results) => {
                    if (err) {
                        console.error('Error:', err.message);
                        return reject(err);
                    }
                    if (results.affectedRows === 0) {
                        resolve({ Error: 'User not found' });
                    }
                    resolve(results);
                }
            );

        })
    }
    )
}


const trashCustomer = async (db, id) => {
    return new Promise((resolve, reject) => {

        db.query(`SELECT COUNT(*) as count FROM orders WHERE customer_id = ? AND status IN (1,2)`, [id], (err, res) => {
            if (err) {
                console.error('Error:', err.message);
                return reject(err);
            }

            const orderCount = res[0].count;

            if (orderCount > 0) {
                resolve({ success: true, message: 'Không thể xóa tài khoản này vì đang có đơn hàng chưa giao !', data: null });
            } else {
                db.query(`UPDATE customer SET status = 0 WHERE id = ?`, [id], (err, res) => {
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


const rescoverTrashCustomer = async (db, id) => {

    return new Promise((resolve, reject) => {

        db.query(`UPDATE customer SET status = 2 WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (res.affectedRows === 0) {
                    resolve({ Error: 'User not found' });
                }
                resolve(res);
            }
        )
    })
}


const getListTrash = async (db) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM customer WHERE status = 0 ORDER BY created_at DESC `
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


const displayCustomer = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT status FROM customer WHERE id = ?`, [id],
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

                    db.query(`UPDATE customer SET status = ? WHERE id = ?`, [newStatus, id],
                        (err, updateRes) => {
                            if (err) {
                                console.error('Error:', err.message);
                                return reject(err);
                            }

                            if (updateRes.affectedRows === 0) {
                                resolve({ Error: 'Failed to update user status' });
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


const deleteCustomer = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM customer WHERE id = ?`, [id],
            (err, res) => {
                if (err) {
                    console.error('Error: ', err.message);
                    return reject;
                }
                if (res.affectedRows === 0) {
                    resolve({ Error: 'User not found' });
                }
                else {
                    resolve({ message: 'User deleted successfully' })
                }
            }
        )
    });
}


const checkLogin = async (db, { email, password }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT u.*
         FROM customer u
         WHERE u.email = ? AND status = 1`, [email],
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve({ data: {}, message: 'Email không hợp lệ !' });
                    return;
                }

                (async () => {
                    const user = res[0];
                    console.log(user);

                    try {
                        const passwordMatch = await bcrypt.compare(password, user.password);
                        if (passwordMatch) {
                            resolve({ data: user, message: 'Đăng nhập thành công !' });
                        } else {
                            resolve({ data: {}, message: 'Password không hợp lệ !' });
                        }
                    } catch (error) {
                        reject(error);
                    }
                })();
            }
        );
    });
};


const updateCustomerAndAddress = async (db, { name, user_name, phone, email, address_1, address_2 }, id) => {

    return new Promise((resolve, reject) => {

        const updatedAt = new Date();

        db.query(
            `UPDATE customer SET name = ?, user_name = ?, phone = ?, email = ? , updated_at = ? WHERE id = ?`,
            [name, user_name, phone, email, updatedAt, id],
            (err, results) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }
                if (results.affectedRows === 0) {
                    resolve({ message: 'Cập nhật tài khoản thất bại !', success: 'false' })
                }
                else {
                    db.query(`SELECT * FROM customer_address WHERE customer_id = ?`, [id],
                        (err, user) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            if (user.length > 0) {
                                db.query(`UPDATE customer_address SET address_1 = ?, address_2 = ? WHERE customer_id = ? `, [address_1, address_2, id],
                                    (err, address) => {
                                        if (err) {
                                            reject(err);
                                            return;
                                        }
                                        if (address.affectedRows === 0) {
                                            resolve({ message: 'Cập nhật địa chỉ thất bại !', success: 'false' })
                                        }
                                        else {
                                            resolve({ message: 'Cập nhật tài khoản thành công !', success: 'true' })
                                        }
                                    }
                                )
                            }
                            else {
                                db.query(`INSERT INTO customer_address (customer_id, address_1, address_2) VALUES (?,?,?) `, [id, address_1, address_2],
                                    (err, address) => {
                                        if (err) {
                                            reject(err);
                                            return;
                                        }
                                        if (address.affectedRows === 0) {
                                            resolve({ message: 'Thêm địa chỉ không thành công ! ', success: 'false' })
                                        }
                                        else {
                                            resolve({ message: 'Cập nhật tài khoản thành công !', success: 'true' })
                                        }
                                    }
                                )

                            }
                        }
                    )
                }

            }
        );
    }
    )
}


const updatePasswordCustomer = async (db, { password, password_new }, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT id, password FROM customer WHERE id = ?`,
            [id],
            (err, results) => {
                if (err) {
                    console.error('Error:', err.message);
                    return reject(err);
                }

                if (results.length === 0) {
                    resolve({ message: 'Không tìm thấy tài khoản !', success: 'false' });
                    return;
                }

                const user = results[0];

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (!isMatch) {
                        resolve({ message: 'Password không chính xác. Vui lòng kiểm tra lại !', success: 'false' });
                        return;
                    }

                    bcrypt.hash(password_new, 10, (err, password_new_hashed) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        db.query(
                            `UPDATE customer SET password = ? WHERE id = ?`,
                            [password_new_hashed, id],
                            (err, results) => {
                                if (err) {
                                    console.error('Error:', err.message);
                                    return reject(err);
                                }
                                if (results.affectedRows === 0) {
                                    resolve({ message: 'Cập nhật không thành công !', success: 'false' });
                                }
                                resolve({ message: 'Mật khẩu đã được thay đổi !', success: 'true' });
                            }
                        );

                    });
                });
            }
        );
    });
};


const updateCustomerAddress = async (db, { address }, id) => {

    return new Promise((resolve, reject) => {

        db.query(
            `UPDATE customer SET address = ? WHERE id = ?`,
            [address, id],
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result.affectedRows === 0) {
                    resolve({ message: 'Cập nhật địa chỉ thất bại !', success: 'false' });
                } else {
                    resolve({ message: 'Cập nhật tài khoản thành công !', success: 'true' });
                }
            }
        );
    });
};


const forgotPassword = async (db, { account, method }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT u.* FROM user u WHERE u.roles = 'customer' AND u.status = 1 AND u.${method} = ?`, [account],
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve({ message: 'Không tìm thấy tài khoản của bạn !' });
                }
                else {
                    const otpCode = generateOTP();
                    console.log(account, otpCode);
                    if (method === 'phone') {
                        console.log('phone');
                        // sendSMS(user.phone, otpCode);
                    } else if (method === 'email') {
                        console.log('email');

                        sendEmail(account, otpCode);
                    }

                    resolve({ message: 'Mã OTP đã được gửi' });
                }

            }
        )
    })
}

const generateOTP = () => {
    const length = 6; // Độ dài của mã OTP
    const characters = '0123456789'; // Các ký tự cho phép trong mã OTP
    let otp = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters[randomIndex];
    }

    return otp;
};


const sendEmail = (email, otpCode) => {
    // Cấu hình thông tin email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nhuttruong0327@gmail.com', // Địa chỉ email của bạn
            pass: 'Truong251103@' // Mật khẩu email của bạn
        }
    });

    // Nội dung email
    const mailOptions = {
        from: 'nhuttruong0327@gmail.com', // Địa chỉ email gửi
        to: email, // Địa chỉ email nhận
        subject: 'Mã OTP', // Tiêu đề email
        text: `Mã OTP của bạn là: ${otpCode}` // Nội dung email
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};



module.exports = {
    getAll,
    getOne,
    createCustomer,
    updateCustomer,
    trashCustomer,
    rescoverTrashCustomer,
    getListTrash,
    displayCustomer,
    deleteCustomer,
    checkLogin,
    updateCustomerAndAddress,
    updatePasswordCustomer,
    updateCustomerAddress,
    forgotPassword,







};