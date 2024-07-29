import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import apiSale from "../../../api/apiSale";

function SaleShow() {

    const {id} = useParams();
    const [sale, setSale] = useState([]);
    const [status, setStatus] = useState('Ẩn');

    useEffect(() => {
        apiSale.getSaleById(id).then((res) => {
            try {
                setSale(res.data);
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
                            <h1 className="d-inline">Chi tiết sale</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/admin/list-sale" className="btn btn-sm btn-info">
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
                                    <td>{sale.id}</td>
                                </tr>
                                <tr>
                                    <th>Tiêu đề sale</th>
                                    <td>{sale.name}</td>
                                </tr>
                                <tr>
                                    <th>Slug</th>
                                    <td>{sale.slug}</td>
                                </tr>
                                <tr>
                                    <th>Mô tả</th>
                                    <td>{sale.description}</td>
                                </tr>
                                <tr>
                                    <th>Phần trăm sale</th>
                                    <td>{sale.percent_sale}</td>
                                </tr>
                                <tr>
                                    <th>Giá sale</th>
                                    <td>{sale.price_sale}</td>
                                </tr>
                                <tr>
                                    <th>Trạng thái</th>
                                    <td>{status}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{sale.created_at}</td>
                                </tr>
                                <tr>
                                    <th>Nhân viên thêm</th>
                                    <td>{sale.created_name}</td>
                                </tr>
                                <tr>
                                    <th>Ngày cập nhật</th>
                                    <td>{sale.updated_at}</td>
                                </tr>
                                <tr>
                                    <th>Nhân viên cập nhật</th>
                                    <td>{sale.updated_name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default SaleShow;