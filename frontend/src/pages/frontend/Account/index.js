import { Link } from "react-router-dom";
import { Outlet } from "../../../component/frontend/Outlet";
import { useAuth } from "../../../component/Provider/AuthProvider";
import { useEffect, useState } from "react";
import apiCustomer from "../../../api/apiCustomer";
import apiOrder from "../../../api/apiOrder";
import { imageURL } from "../../../api/config";
import img_avt from "../../../assets/frontend/images/avatars/avt4.jpg";

function Account() {
    const { token, setToken } = useAuth();

    const [data, setData] = useState({});

    const [orders, setOrders] = useState([]);
    const [qty, setQty] = useState(0);
    const [qty_delivered, setQtyDelivered] = useState(0);
    const [qty_no_delivery, setQtyNoDelivery] = useState(0);
    const [qty_are_delivery, setQtyAreDelivery] = useState(0);
    const [qty_favourite, setQtyfavourite] = useState(0);

    useEffect(() => {
        (async () => {
            await apiCustomer.getCustomerById(token).then((res) => {
                setData(res.data);
            });

            await apiOrder.getOrderByUserId(token, 1, 4).then((res) => {
                setOrders(res.data);
                setQtyDelivered(res.qty_delivered);
                setQtyNoDelivery(res.qty_no_delivery);
                setQtyAreDelivery(res.qty_are_delivery);
                setQty(res.qty);
            })
        })()
    }, [])


    const handleLogout = () => {
        setToken(null);
    }

    return (
        <div className="">
            {console.log(qty)}
            <section className="section-pagetop bg-gray" >
                <div className="container">
                    <h3 className="title-page">Tài khoản của tôi</h3>
                </div>
            </section>
            {Object.keys(data).length !== 0 ? (<section className="section-content padding-y">
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

                            <article className="card mb-3">
                                <div className="card-body">

                                    <figure className="icontext">
                                        <div className="icon">
                                            <img className="rounded-circle img-sm border" src={img_avt} style={{ height: "80px", width: "80px" }} />
                                        </div>
                                        <div className="text">
                                            <strong> {data.name} </strong> <br />
                                            <p className="mb-2">{data.email} </p>
                                        </div>
                                    </figure>
                                    <hr />
                                    {data.address ? (
                                        <p>
                                            <i className="fa fa-map-marker text-muted"></i> &nbsp; <b>Địa chỉ: </b>{data.address}
                                            <Link to={`/tai-khoan/dia-chi`} className=" ms-3 btn btn-outline-danger btn-sm">Chỉnh sửa</Link>
                                        </p>
                                    ) : (
                                        <div className="text-center">
                                            <h6>
                                                Hãy thêm địa chỉ để cửa hàng giao hàng tận nơi cho bạn !
                                            </h6>
                                            <Link to={`/tai-khoan/cai-dat`} className="btn btn-success btn-sm">Thêm ngay</Link>
                                            <br/>
                                            <br/>
                                        
                                        </div>

                                    )}

                                    <article className="card-group card-stat">
                                        <figure className="card bg">
                                            <div className="p-3">
                                                <h4 className="title">{qty}</h4>
                                                <span>Đơn hàng</span>
                                            </div>
                                        </figure>
                                        <figure className="card bg">
                                            <div className="p-3">
                                                <h4 className="title">{qty_favourite}</h4>
                                                <span>Danh sách yêu thích</span>
                                            </div>
                                        </figure>
                                        <figure className="card bg">
                                            <div className="p-3">
                                                <h4 className="title">{qty_are_delivery + qty_no_delivery}</h4>
                                                <span>Chờ giao hàng</span>
                                            </div>
                                        </figure>
                                        <figure className="card bg">
                                            <div className="p-3">
                                                <h4 className="title">{qty_delivered}</h4>
                                                <span>Đã giao</span>
                                            </div>
                                        </figure>
                                    </article>
                                </div>
                            </article>
                            {orders.length > 0 && (<article className="card  mb-3">
                                <div className="card-body">
                                    <h5 className="card-title mb-4">Đơn hàng đã giao gần đây</h5>
                                    <br />
                                    <br />
                                    <div className="row">
                                        {orders.map((item, index) => {
                                            return (
                                                <div className="col-md-6">
                                                    <figure className="itemside  mb-3">
                                                        <div className="aside"><img src={imageURL + item.image} className="border img-sm" style={{ height: "80px", width: "80px" }} /></div>
                                                        <figcaption className="info">
                                                            <time className="text-muted"><i className="fa fa-calendar-alt me-1"></i>
                                                                {item.created_at}</time>
                                                            <p>{item.name} </p>
                                                            <span className="text-success">Xác nhận đặt hàng</span>
                                                        </figcaption>
                                                    </figure>
                                                </div>

                                            )
                                        })}
                                    </div>
                                    <Link href="#" className="btn btn-outline-primary btn-block"> Xem tất cả các đơn hàng <i
                                        className="fa fa-chevron-down"></i> </Link>
                                </div>
                            </article>
                            )}

                        </main>

                    </div>

                </div>
            </section>
            ) : (
                <section className="section-content padding-y">
                    <div className="container">
                        <div className="text-center">
                            <h6>Vui lòng đăng nhập tài khoản !</h6>
                        </div>
                    </div>
                </section>
            )}

        </div>
    );

}
export default Account;