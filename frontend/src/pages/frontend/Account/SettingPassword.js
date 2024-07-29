import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../component/Provider/AuthProvider";
import { useState } from "react";
import apiCustomer from "../../../api/apiCustomer";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function SettingPassword() {

    const { token, setToken } = useAuth();

    const navigate = useNavigate(); // chuyen trang

    const [password, setPassword] = useState('');
    const [password_new, setPasswordNew] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');


    // useEffect(() => {
    //     (async () => {
    //         await apiCustomer.getCustomerById(token).then((res) => {
    //             setPassword(res.data.password);
    //         });

    //     })()
    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== '' && password_new !== '') {
            if(password_confirm === password_new){
                const data = {
                    password: password,
                    password_new: password_new
                }

                await apiCustomer.updatePassword(data, token).then(res => {
                    if (res.data.success === 'true') {
                        alert(res.data.message);
                        setToken(null);
    
                    }
                    else {
                        alert(res.data.message);
                    }
                })
    
            }
            else{
                alert('Mật khẩu mới không trùng khớp !');
            }
        }
        else {
            alert('Vui lòng nhập đầy đủ thông tin !');
        }
    }
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="">
            <section className="section-pagetop bg-gray" >
                <div className="container">
                    <h3 className="title-page">Tài khoản của tôi</h3>
                </div>
            </section>
            <section className="section-content padding-y">
                <div className="container">

                    <div className="row">
                        <aside className="col-md-3">
                            <nav className="list-group">
                                <Link className="list-group-item active text-white" style={{ background: "#ff6a00", borderColor: "#ff6a00" }} to="/tai-khoan">Tổng quan</Link>
                                <Link className="list-group-item" to={`/tai-khoan/don-hang/5/1`}> Đơn hàng</Link>
                                <Link className="list-group-item" to={`/tai-khoan/cai-dat`}> Cài đặt tài khoản </Link>
                                <Link className="list-group-item" href="page-index-1.html"> Đăng xuất </Link>
                            </nav>
                        </aside>
                        <main className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <form className="row" onSubmit={handleSubmit}>
                                        <div className="col-md-9 row">
                                            <div className="col-6"></div>
                                            <div className="col-5">
                                                <div className="col-12 form-group">
                                                    <label>Mật khẩu hiện tại (*)</label>
                                                    <div className="password-input-wrapper">
                                                        <input
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="form-control"
                                                            style={{ paddingRight: "35px" }}
                                                        />
                                                        <div
                                                            className="password-toggle-icon"
                                                            onClick={togglePasswordVisibility}
                                                            style={{ position: "absolute", top: "50%", right: "10px", cursor: "pointer" }}
                                                        >
                                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col form-group">
                                                    <label>Mật khẩu mới (*)</label>
                                                    <div className="password-input-wrapper">
                                                        <input
                                                            value={password_new}
                                                            onChange={(e) => setPasswordNew(e.target.value)}
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="form-control"
                                                            style={{ paddingRight: "35px" }}
                                                        />
                                                        <div
                                                            className="password-toggle-icon"
                                                            onClick={togglePasswordVisibility}
                                                            style={{ position: "absolute", top: "50%", right: "10px", cursor: "pointer" }}
                                                        >
                                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col form-group">
                                                    <label>Mật khẩu vừa nhập (*)</label>
                                                    <div className="password-input-wrapper">
                                                        <input
                                                            value={password_confirm}
                                                            onChange={(e) => setPasswordConfirm(e.target.value)}
                                                            type={showPassword ? 'text' : 'password'}
                                                            className="form-control"
                                                            style={{ paddingRight: "35px" }}
                                                        />
                                                        <div
                                                            className="password-toggle-icon"
                                                            onClick={togglePasswordVisibility}
                                                            style={{ position: "absolute", top: "50%", right: "10px", cursor: "pointer" }}
                                                        >
                                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                        </div>
                                                    </div>
                                                </div>

                                                <button className="btn btn-primary mr-2">Lưu</button>
                                            </div>

                                            <br /><br /><br /><br /><br /><br />

                                        </div>
                                        {/* <div className="col-md">
                            <img src="images/avatars/avatar1.jpg" className="img-md rounded-circle border" />
                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </main>

                    </div>

                </div>
            </section>
            {/* <section className="section-content padding-y">
                    <div className="container">
                        <div className="text-center">
                            <h6>Vui lòng đăng nhập tài khoản !</h6>
                        </div>
                    </div>
                </section> */}

        </div>
    );

}
export default SettingPassword;
