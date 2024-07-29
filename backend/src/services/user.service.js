const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

const getAll = async (db, roles) => {
    return new Promise((resolve, reject) => {
        db.query(
            `
          SELECT u.*, r.role_name
          FROM user u
          JOIN roles r ON r.id = u.role_id
          WHERE u.status != 0
          ORDER BY u.created_at DESC
        `,
            [roles],
            (err, users) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.query(
                    ` SELECT (SELECT COUNT(*) FROM user WHERE status = 0 ) AS qty_trash,
                        (SELECT COUNT(*) FROM user WHERE status != 0 ) AS qty_user`,
                    [roles, roles],
                    (err, counts) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        if (users.length === 0) {
                            resolve({ data: [], qty_trash: 0, qty_user: 0 });
                        }

                        resolve({ data: users, qty_trash: counts[0].qty_trash, qty_user: counts[0].qty_user });
                    }
                );
            }
        );
    });
};


const getOne = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT u.*, r.role_name, r.privileges, uc.name as created_name, uu.name as updated_name
             FROM user u
             LEFT JOIN roles r ON r.id = u.role_id
             LEFT JOIN user uc ON u.created_by = uc.id
             LEFT JOIN user uu ON u.updated_by = uu.id
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


const createUser = async (db, { name, phone, email, password, role_id, status, created_by }) => {
    return new Promise((resolve, reject) => {
        const createdAt = new Date().toISOString();

        // Mã hóa mật khẩu
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                reject(err);
                return;
            }

            db.query(
                `INSERT INTO user (name, email, phone, password, role_id, created_at, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [name, email, phone, hashedPassword, role_id, createdAt, status, created_by],
                (err, results) => {
                    if (err) {
                        console.error('Validation error: ', err.message);
                        reject(err);
                        return;
                    }

                    resolve(results);
                }
            );
        });
    });
};

const updateUser = async (db, { name, phone, email, password, role_id, status, updated_by }, id) => {

    return new Promise((resolve, reject) => {

        const updatedAt = new Date().toISOString();

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                reject(err);
                return;
            }


            db.query(
                `UPDATE user SET name = ?, phone = ?, email = ? , password = ?, role_id = ?, updated_at = ? , status = ?, updated_by = ? WHERE id = ?`,
                [name, phone, email, hashedPassword, role_id, updatedAt, status, updated_by, id],
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


const trashUser = async (db, id) => {
    return new Promise((resolve, reject) => {

        db.query(`UPDATE user SET status = 0 WHERE id = ?`, [id], (err, res) => {
            if (err) {
                console.error('Error:', err.message);
                return reject(err);
            }

            if (res.affectedRows === 0) {
                resolve({ success: false, message: 'Không tìm thấy dữ liệu' });
            }

            resolve({ data: res, success: true, message: 'Đã xóa dữ liệu vào thùng rác !' });
        });
    });
};


const rescoverTrashUser = async (db, id) => {

    return new Promise((resolve, reject) => {

        db.query(`UPDATE user SET status = 2 WHERE id = ?`, [id],
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
            `SELECT u.*, r.role_name 
            FROM user u
            JOIN roles r ON r.id = u.role_id
            WHERE u.status = 0 ORDER BY u.created_at DESC `
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


const displayUser = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT status FROM user WHERE id = ?`, [id],
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

                    db.query(`UPDATE user SET status = ? WHERE id = ?`, [newStatus, id],
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


const deleteUser = async (db, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM user WHERE id = ?`, [id],
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


const checkLogin = async (db, { email }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT u.*, r.role_name FROM user u JOIN roles r ON r.id = u.role_id WHERE u.email = ? AND u.status = 1`, [email],
            (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (res.length === 0) {
                    resolve(null);
                    return;
                }
                resolve(res[0]);
            }
        );
    });
};




const updatePasswordCustomer = async (db, { password, password_new }, id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT id, password FROM user WHERE id = ?`,
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
                            `UPDATE user SET password = ? WHERE id = ?`,
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
    createUser,
    updateUser,
    trashUser,
    rescoverTrashUser,
    getListTrash,
    displayUser,
    deleteUser,
    checkLogin,
    updatePasswordCustomer,
    forgotPassword,







};