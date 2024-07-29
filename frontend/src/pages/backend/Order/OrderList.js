import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageURL } from "../../../api/config";
import apiOrder from "../../../api/apiOrder";
import "./order.css";


function OrderList() {

    const [data, setData] = useState([]);

    const page = parseInt(useParams().page);
    const limit = parseInt(useParams().limit);

    const [pages, setPages] = useState(1);

    const [qty_data, setQtyData] = useState(0);
    const [qty_cancel, setQtyCancel] = useState(0);

    const [tamp, setTamp] = useState();



    useEffect(() => {
        apiOrder.getAll(page, limit).then((res) => {
            try {
                console.log(res.data)
                const numberOfPages = res.meta.pagination.pageCount;
                setPages(numberOfPages);
                setData(res.data);
                setQtyData(res.meta.pagination.total);
                setQtyCancel(res.qty_cancel);


            } catch (e) {
                console.log(e);
            }
            setTamp();
        })
    }, [tamp, page])


    const [showForm, setShowForm] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const showStatusForm = (orderId) => {
        setSelectedOrderId(orderId);
        setShowForm(true);
    };

    const handleStatusUpdate = async (e) => {
        e.preventDefault();
        const selectedStatus = document.querySelector('input[name="status"]:checked').value;
        const data = {
            status: selectedStatus
        }
        await apiOrder.updateStatusOrder(data, selectedOrderId).then((res) => {
            if (res.data.success === 'true') {
                alert(res.data.message);
                setShowForm(false);
                setTamp(selectedOrderId)
            }
            else {
                alert(res.data.message);
            }
        })
    };

    return (
        <div className="content-wrapper">
            {console.log(showForm)}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-10">
                            <h1 className="d-inline">Tất cả đơn hàng <sup>({qty_data})</sup></h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link class="action-btn btn" to="/admin/orders/cancel/1/10" style={{ color: "red" }}>
                                Đơn hủy
                                <sup class="count ms-1">{qty_cancel}</sup>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="text-right pt-2 pe-4">
                        {/* <Link class="btn btn-success" to="/admin/list-post/create">
                            Tạo bài viết
                        </Link> */}

                    </div>
                    <div className="card-body">

                        <div className="row content">
                            <div className="col-md old-element">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "30px" }}>
                                                <input type="checkbox" />
                                            </th>
                                            <th>Id</th>
                                            {/* <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th> */}
                                            <th>Tên khách hàng</th>

                                            <th>Email</th>
                                            <th>Sđt</th>
                                            <th>Phương thức nhận hàng</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => {
                                            return (
                                                <tr className="datarow" key={index}>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        <div className="name">
                                                            {item.name}
                                                        </div>

                                                        <div className="function_style">
                                                            {/* <button onClick={() => displayPost(item.id)} className="btn btn-sm">{item.status === 2 ? "Hiện" : "Ẩn"}</button> | */}
                                                            {/* <Link to={`/admin/list-post/update/${item.id}`} className="btn btn-sm">Chỉnh sửa</Link> | */}
                                                            <Link to={`/admin/order/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                            <button onClick={() => showStatusForm(item.id)} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Cập nhật trạng thái</button>
                                                        </div>
                                                    </td>
                                                    {/* <td>{item.slug}</td> */}
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.shipping_methods}</td>
                                                    <td>
                                                        {item.status === 2 ? "Người bán đang chuẩn bị hàng" : item.status === 1 ? "Đang chờ xác nhận đơn hàng" : item.status === 0 ? "Đã hủy" : item.status === 3 ? "Đang giao hàng" : "Đã giao hàng"}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {showForm && (
                                <div className="new-element modal1">
                                    <div className="modal-content">
                                        <div className="row">
                                            <h4 className="col-11">Cập nhật trạng thái</h4>
                                            <span className="text-danger close col-1     btn btn-sm" onClick={() => setShowForm(false)}>&times;</span>
                                        </div>
                                        <br />
                                        <div className="col-6"></div>
                                        <form onSubmit={handleStatusUpdate}>
                                            {/* <label className="me-4">
                                                <input type="radio" className="me-1" name="status" value="1" required />
                                                Chưa giao hàng
                                            </label> */}
                                            <label className="me-4">
                                                <input type="radio" className="me-1" name="status" value="2" required />
                                                Người bán đang chuẩn bị hàng
                                            </label>
                                            <label className="me-4">
                                                <input type="radio" className="me-1" name="status" value="3" required />
                                                Đang giao hàng
                                            </label>
                                            <label className="me-4">
                                                <input type="radio" className="me-1" name="status" value="4" required />
                                                Đã giao hàng
                                            </label>
                                            <label className="me-4">
                                                <input type="radio" className="me-1" name="status" value="0" required />
                                                Hủy đơn
                                            </label>
                                            <br />
                                            <button type="submit" className="btn btn-primary">
                                                Lưu
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}

                            <ul className="pagination">
                                <li className="page-item">
                                    {page > 1 ? (
                                        <Link className="page-link" to={`/admin/orders/${page - 1}/${limit}`}>Previous</Link>
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
                                            to={`/admin/orders/${index + 1}/${limit}`}
                                        >
                                            {index + 1}
                                        </Link>
                                    </li>
                                ))}
                                <li className="page-item">
                                    {page < pages ? (
                                        <Link className="page-link" to={`/admin/orders/${page + 1}/${limit}`}>
                                            Next
                                        </Link>
                                    ) : (
                                        <span className="page-link disabled">Next</span>
                                    )}

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default OrderList;