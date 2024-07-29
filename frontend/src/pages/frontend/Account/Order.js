import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiOrder from "../../../api/apiOrder";
import { useAuth } from "../../../component/Provider/AuthProvider";
import { imageURL } from "../../../api/config";

function Order() {

    const [data, setData] = useState([]);
    const { token, setToken } = useAuth();

    const formatPrice = (price) => {
        const roundedPrice = Math.round(price);
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(roundedPrice);
        return formattedPrice.replace(/,/g, '.') + '.000';
    };

    const page = parseInt(useParams().page);
    const limit = parseInt(useParams().limit);

    const [pages, setPages] = useState(1);

    useEffect(() => {
        (async () => {
            await apiOrder.getAllOrderByUserId(token, page, limit).then((res) => {
                setData(res.data);
                const numberOfPages = res.meta.pagination.pageCount;
                setPages(numberOfPages);
            })
        })()
    }, [page])

    const handleLogout = () => {
        setToken(null);
    }

    return (
        <div className="">
            {console.log(data)}
            <section className="section-pagetop bg-gray" >
                <div className="container">
                    <h3 className="title-page">Tài khoản của tôi</h3>
                </div>
            </section>
            {data.length > 0 ? (<section className="section-content padding-y">
                <div className="container">

                    <div className="row">
                        <aside className="col-md-3">
                            <nav className="list-group">
                                <Link className="list-group-item active text-white" style={{ background: "#ff6a00", borderColor: "#ff6a00" }} to="/tai-khoan">Tổng quan</Link>
                                <Link className="list-group-item " to={`/tai-khoan/don-hang/5/1`}> Đơn hàng</Link>
                                <Link className="list-group-item" to={`/tai-khoan/cai-dat`}> Cài đặt tài khoản </Link>
                                <button className="list-group-item text-left" onClick={handleLogout}> Đăng xuất </button>
                            </nav>
                        </aside>
                        <main className="col-md-9">
                            {data.map((item, index) => (

                                <div className="col-md-9" key={index}>
                                    {console.log(item.products)}
                                    <article className="card mb-4">
                                        <header className="card-header">
                                            <p href="#" className="float-right text-success">

                                                {item.status === 2 ? "Người bán đang chuẩn bị hàng" : item.status === 1 ? "Đang chờ xác nhận đơn hàng" : item.status === 0 ? "Đã hủy" : item.status === 3 ? "Đang giao hàng" : "Đã giao hàng"}
                                            </p>
                                            <strong className="d-inline-block mr-3">Order ID: {item.id}</strong>
                                            <span>Ngày đặt hàng: {item.created_at}</span>
                                        </header>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <h6 className="text-muted">Chuyển tới</h6>
                                                    <p>{item.name} <br />
                                                        Sdt: {item.phone} <br />Email: {item.email} <br />
                                                        Địa chỉ: {item.address}<br />

                                                    </p>
                                                </div>
                                                <div className="col-md-4">
                                                    {/* <h6 className="text-muted">Payment</h6> */}
                                                    <span className="text-success">
                                                        {item.shipping_methods}
                                                    </span>
                                                    <p>Tổng phụ: {formatPrice(item.total)} <br />
                                                        Phí vận chuyển:  {formatPrice(25)}<br />
                                                        <span className="b">Tổng : {formatPrice(item.total + 25)} </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <tbody>
                                                    {item.products.map((pro, index) => (

                                                        <tr key={index}>
                                                            <td width="65">
                                                                <img src={imageURL + pro.image} className="img-xs border" />
                                                            </td>
                                                            <td>
                                                                <p className="title mb-0">{pro.name}</p>
                                                                <var className="price text-muted">{formatPrice(pro.price)}</var>
                                                            </td>
                                                            <td>Số lượng: {pro.qty}</td>
                                                            {/* <td width="250"> <a href="#" className="btn btn-outline-primary">Track order</a>
                                                                <div className="dropdown d-inline-block">
                                                                    <a href="#" data-toggle="dropdown"
                                                                        className="dropdown-toggle btn btn-outline-secondary">More</a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a href="#" className="dropdown-item">Return</a>
                                                                        <a href="#" className="dropdown-item">Cancel order</a>
                                                                    </div>
                                                                </div>
                                                            </td> */}
                                                        </tr>


                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </article>
                                </div>


                            ))}


                            <ul className="pagination">
                                <li className="page-item">
                                    {page > 1 ? (
                                        <Link className="page-link" to={`/tai-khoan/don-hang/${limit}/${page - 1}`}>Previous</Link>
                                    ) : (
                                        <span className="page-link disabled">Previous</span>
                                    )}
                                </li>
                                {Array.from(Array(pages).keys()).map((index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${index + 1 === page ? "active" : ""}`}
                                    >
                                        <Link
                                            className="page-link bg-white"
                                            to={`/tai-khoan/don-hang/${limit}/${index + 1}`}
                                        >
                                            {index + 1}
                                        </Link>
                                    </li>
                                ))}
                                <li className="page-item">
                                    {page < pages ? (
                                        <Link className="page-link" to={`/tai-khoan/don-hang/${limit}/${page + 1}`}>
                                            Next
                                        </Link>
                                    ) : (
                                        <span className="page-link disabled">Next</span>
                                    )}

                                </li>
                            </ul>

                        </main>

                    </div>

                </div>
            </section>
            ) : (
                <section className="section-content padding-y">
                    <div className="container">

                        <div className="row">
                            <aside className="col-md-3">
                                <nav className="list-group">
                                    <Link className="list-group-item active text-white" style={{ background: "#ff6a00", borderColor: "#ff6a00" }} to="/tai-khoan">Tổng quan</Link>
                                    <Link className="list-group-item " to={`/tai-khoan/don-hang`}> Đơn hàng</Link>
                                    <Link className="list-group-item" to={`/tai-khoan/cai-dat`}> Cài đặt tài khoản </Link>
                                    <button className="list-group-item text-left" onClick={handleLogout}> Đăng xuất </button>
                                </nav>
                            </aside>
                            <main className="col-md-9">

                                <div className="col-md-9">
                                    <p className="text-center">Bạn chưa có đơn hàng nào !</p>
                                </div>

                            </main>

                        </div>

                    </div>
                </section>
            )}

        </div>
    );
}
export default Order;

