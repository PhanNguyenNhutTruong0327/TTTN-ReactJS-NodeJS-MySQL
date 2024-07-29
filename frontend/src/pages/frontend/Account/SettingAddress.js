import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../component/Provider/AuthProvider";
import { useEffect, useState } from "react";
import apiCustomer from "../../../api/apiCustomer";


function SettingAddress() {


    const { token } = useAuth();

    const navigate = useNavigate(); // chuyen trang

    const [address, setAddress] = useState('');


    useEffect(() => {
        (async () => {
            await apiCustomer.getCustomerById(token).then((res) => {
                    setAddress(res.data.address);
            });

        })()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (address !== '') {

            const data = {
                address: address
            }

            await apiCustomer.updataCustomerAddress(data, token).then(res => {
                if (res.data.success === 'true') {
                    alert(res.data.message);
                    navigate('/tai-khoan', { replace: true });
                }
                else {
                    alert(res.data.message);
                }
            })

        }
        else {
            alert('Vui lòng nhập đầy đủ thông tin !');
        }
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
                                <Link className="list-group-item" href="page-index-1.html"> Đăng xuất </Link>
                            </nav>
                        </aside>
                        <main className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <form className="row" onSubmit={handleSubmit}>
                                        <div className="col-md-9 row">
                                            <div className="col-1"></div>
                                            <div className="col-11">
                                                <div className="col-12 form-group">
                                                    <label>Địa chỉ :</label>
                                                    <div className="password-input-wrapper">
                                                        <input
                                                            value={address}
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            type='text'
                                                            className="form-control"
                                                            style={{ paddingRight: "35px" }}
                                                        />
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
export default SettingAddress;
