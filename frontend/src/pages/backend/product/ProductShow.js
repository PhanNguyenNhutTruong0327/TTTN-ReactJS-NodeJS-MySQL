import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import { imageURL } from "../../../api/config";

function ProductShow() {

    const { id } = useParams();
    const [data, setData] = useState([]);

    const [status, setStatus] = useState('Ẩn');

    useEffect(() => {
        apiProduct.getProductById(id).then((res) => {
            try {
                setData(res.data.data);
                if (res.data.status === 1) {
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
                            <h1 className="d-inline">Chi tiết sản phẩm</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/admin/list-products/1/10" className="btn btn-sm btn-info">
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
                                    <td>{data.product_id}</td>
                                </tr>

                                <tr>
                                    <th>Hình ảnh</th>
                                    <td><img style={{ width: "150px" }} src={imageURL + data.image} /></td>
                                </tr>
                                <tr>
                                    <th>Hình ảnh chi tiết</th>
                                    <td><img style={{ width: "150px" }} src={imageURL + data.image_detail} /></td>
                                </tr>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Thương hiệu</th>
                                    <td>{data.nameBrand}</td>
                                </tr>
                                <tr>
                                    <th>Danh mục</th>
                                    <td>{data.nameCat}</td>
                                </tr>
                                <tr>
                                    <th>Slug</th>
                                    <td>{data.slug}</td>
                                </tr>
                                <tr>
                                    <th>Giá</th>
                                    <td>{data.price}.000<sup>đ</sup></td>
                                </tr>
                                <tr>
                                    <th>Số lượng</th>
                                    <td>{data.qty}</td>
                                </tr>

                                <tr>
                                    <th style={{ verticalAlign: "middle" }} rowSpan="2">Chi tiết sản phẩm</th>
                                    <td>{data.detail_1}</td>
                                </tr>
                                <tr>
                                    <td>{data.detail_2}</td>
                                </tr>
                                <tr>
                                    <th>Trạng thái</th>
                                    <td>{status}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{data.createPro}</td>
                                </tr>
                                <tr>
                                    <th>Ngày cập nhật</th>
                                    <td>{data.updatePro}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <br></br>
                    <br></br>
                    {data.chip && (<div className="card-body p-2">
                        <h5>Thông số kỹ thuật</h5>
                        <br></br>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>Tên trường</th>
                                    <th>Giá trị</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Màn hình:</th>
                                    <td>{data.screen}</td>
                                </tr>
                                <tr>
                                    <th>Hệ điều hành:</th>
                                    <td>{data.operating_system}</td>
                                </tr>
                                <tr>
                                    <th>Camera sau</th>
                                    <td>{data.rear_camera}</td>
                                </tr>
                                <tr>
                                    <th>Camera trước</th>
                                    <td>{data.front_camera}</td>
                                </tr>
                                <tr>
                                    <th>Chip</th>
                                    <td>{data.chip}</td>
                                </tr>
                                <tr>
                                    <th>RAM</th>
                                    <td>{data.ram}</td>
                                </tr>
                                <tr>
                                    <th>Dung lượng lưu trữ</th>
                                    <td>{data.rom}</td>
                                </tr>
                                <tr>
                                    <th>SIM</th>
                                    <td>{data.connect}</td>
                                </tr>
                                <tr>
                                    <th>Pin</th>
                                    <td>{data.pin}</td>
                                </tr>
                                <tr>
                                    <th>Kích thước</th>
                                    <td>{data.size}</td>
                                </tr>
                                <tr>
                                    <th>Ngày cập nhật</th>
                                    <td>{data.updated_at}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    )}
                </div>
            </section>
        </div>

    );
}

export default ProductShow;