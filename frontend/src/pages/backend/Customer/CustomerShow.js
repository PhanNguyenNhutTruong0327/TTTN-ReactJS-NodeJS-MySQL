import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import apiCustomer from "../../../api/apiCustomer";

function CustomerShow() {

    const {id} = useParams();
    const [user, setUser] = useState([]);

    const [status, setStatus] = useState('Ẩn');

    useEffect(() => {
        apiCustomer.getCustomerById(id).then((res) => {
            try {
                setUser(res.data);
                if(res.data.status === 1){
                    setStatus('Hiển thị');
                }
            } catch (e) {
                console.log(e);
            }
        })
    }, [])

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Chi tiết khách hàng</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/admin/list-customer" className="btn btn-sm btn-info">
                            <i className="fa fa-reply me-1" aria-hidden="true"></i>
                            Quay lại
                        </Link>
                    </div>
                    <div className="card-body p-2">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>Tên trường</th>
                                    <th>Giá trị</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{user.id}</td>
                                </tr>
                                <tr>
                                    <th>Họ tên</th>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <th>User name</th>
                                    <td>{user.user_name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại</th>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <th>Password</th>
                                    <td>{user.password}</td>
                                </tr>
                                <tr>
                                    <th>Địa chỉ</th>
                                    <td>{user.address}</td>
                                </tr>
                                <tr>
                                    <th>Trạng thái</th>
                                    <td>{status}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{user.created_at}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default CustomerShow;