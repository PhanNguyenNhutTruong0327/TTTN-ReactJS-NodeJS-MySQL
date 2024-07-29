import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../component/Provider/AuthProvider";
import { useEffect, useState } from "react";
import apiCustomer from "../../../api/apiCustomer";

function Setting() {

    const { token, setToken } = useAuth();

    const navigate = useNavigate(); // chuyen trang

    const [name, setName] = useState('');
    const [user_name, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        (async () => {
            await apiCustomer.getCustomerById(token).then((res) => {
                setName(res.data.name);
                setUserName(res.data.user_name);
                setEmail(res.data.email);
                setPhone(res.data.phone);
                setAddress(res.data.address);
                setPassword(res.data.password);
            });

        })()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name !== '' && email !== '' && phone !== '' && address !== ''){
            const data = {
                name: name,
                user_name: user_name,
                email: email,
                phone: phone,
                address: address,
                status: 1,
                password: password
            }

            await apiCustomer.updateCustomer(data, token).then(res => {
                if(res.data !== null){
                    alert('Cập nhật tài khoản thành công !');
                    navigate('/tai-khoan', { replace: true });

                }
                else{
                    alert('Đã xảy ra lỗi vui lòng thử lại sau !');
                }
            })
        }
        else{
            alert('Vui lòng nhập đầy đủ thông tin !');
        }   
    }

    const handleLogout = () => {
        setToken(null);
    }

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
                                <button className="list-group-item text-left" onClick={handleLogout}> Đăng xuất </button>
                            </nav>
                        </aside>
                        <main className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <form className="row" onSubmit={handleSubmit}>
                                        <div className="col-md-9">
                                            <div className="form-row">
                                                <div className="col form-group">
                                                    <label>Họ tên (*)</label>
                                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                                                </div>
                                                <div className="col form-group">
                                                    <label>User name (*)</label>
                                                    <input type="text" className="form-control" value={user_name} onChange={(e) => setUserName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col form-group">
                                                    <label>Số điện thoại (*)</label>
                                                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                </div>
                                                <div className="col form-group">
                                                    <label>Email (*)</label>
                                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="form-row">
                                                <div className="col form-group">
                                                    <label>Địa chỉ</label>
                                                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                                                </div>
                                                {/* <div className="col form-group">
                                                    <label>Địa chỉ 2</label>
                                                    <input type="text" className="form-control" value={address_2} onChange={(e) => setAddress2(e.target.value)} />
                                                </div> */}
                                            </div>
                                            {/* <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Country</label>
                                    <select id="inputState" className="form-control">
                                        <option> Choose...</option>
                                        <option>Uzbekistan</option>
                                        <option>Russia</option>
                                        <option selected="">United States</option>
                                        <option>India</option>
                                        <option>Afganistan</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>City</label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div> */}

                                            {/* <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Zip</label>
                                    <input type="text" className="form-control" value="123009" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Phone</label>
                                    <input type="text" className="form-control" value="+123456789" />
                                </div>
                            </div> */}

                                            <button className="btn btn-primary mr-2">Lưu</button>
                                            <Link to={`/tai-khoan/mat-khau`} className="btn btn-light">Thay đổi mật khẩu</Link>

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
export default Setting;
