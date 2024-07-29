import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import apiCategory from "../../../api/apiCategory";
import apiBanner from "../../../api/apiBanner";
import { imageURL } from "../../../api/config";

function BannerShow() {

    const {id} = useParams();
    const [banner , setBanner] = useState([]);

    useEffect(() => {
        apiBanner.getOne(id).then((res) => {
            try {
                setBanner(res.data);
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
                            <h1 className="d-inline">Chi tiết danh mục</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/admin/list-banners" className="btn btn-sm btn-info">
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
                                    <td>{banner.id}</td>
                                </tr>
                                <tr>
                                    <th>Tên banner</th>
                                    <td>{banner.name}</td>
                                </tr>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <td ><img style={{width:"250px"}} src={imageURL + banner.image} alt="anh" /></td>
                                </tr>
                                <tr>
                                    <th>Vị trí</th>
                                    <td>{banner.position}</td>
                                </tr>
                                <tr>
                                    <th>Mô tả ngắn</th>
                                    <td>{banner.description}</td>
                                </tr>
                                <tr>
                                    <th>Đường dẫn</th>
                                    <td>{banner.link}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{banner.status == 1 ? "Hiển thị" : "Ẩn"}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{banner.created_at}</td>
                                </tr>
                                <tr>
                                    <th>Nhân viên thêm</th>
                                    <td>{banner.created_name}</td>
                                </tr>
                                <tr>
                                    <th>Ngày cập nhật</th>
                                    <td>{banner.updated_at}</td>
                                </tr>
                                <tr>
                                    <th>Nhân viên cập nhật</th>
                                    <td>{banner.updated_name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default BannerShow;