import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import apiBrand from "../../../api/apiBrand";
import { imageURL } from "../../../api/config";

function BrandShow() {

    const {id} = useParams();
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        apiBrand.getBrandById(id).then((res) => {
            try {
               setBrand(res.data);
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
                            <h1 className="d-inline">Chi tiết thương hiệu</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/admin/list-brands" className="btn btn-sm btn-info">
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
                                    <td>{brand.id}</td>
                                </tr>
                                <tr>
                                    <th>Tên thương hiệu</th>
                                    <td>{brand.name}</td>
                                </tr>
                                <tr>
                                    <th>Slug</th>
                                    <td>{brand.slug}</td>
                                </tr>
                                <tr>
                                    <th>Icon</th>
                                    <td><img src={imageURL + brand.icon}/></td>
                                </tr>
                                <tr>
                                    <th>Mô tả</th>
                                    <td>{brand.icon}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{brand.status == 1 ? "Hiển thị" : "Ẩn"}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{brand.created_at}</td>
                                </tr>
                                <tr>
                                    <th>Nhân viên thêm</th>
                                    <td>{brand.created_name}</td>
                                </tr>
                                <tr>
                                    <th>Ngày cập nhật</th>
                                    <td>{brand.updated_at}</td>
                                </tr>
                                <tr>
                                    <th>Nhân viên cập nhật</th>
                                    <td>{brand.updated_name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default BrandShow;