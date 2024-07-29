import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageURL } from "../../../api/config";
import apiDiscountedPro from "../../../api/apiDiscountedPro";

function DiscountedProductShow() {

    const { id } = useParams();
    const [data, setData] = useState([]);

	const formatPrice = (price) => {
		const roundedPrice = Math.round(price);
		const formattedPrice = new Intl.NumberFormat('vi-VN').format(roundedPrice);
		return formattedPrice.replace(/,/g, '.') + '.000';
	};


    useEffect(() => {
        apiDiscountedPro.getShowDiscountedProduct(id).then((res) => {
            try {
                setData(res.data);
                console.log(res.data);
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
                        <Link to="/admin/discounted-products/1/10" className="btn btn-sm btn-info">
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
                                    <th>Chủ đề sale</th>
                                    <td>{data.title_sale}</td>
                                </tr>
                                <tr>
                                    <th>Phần trăm giảm</th>
                                    <td>-{data.percent_sale}%</td>
                                </tr>
                                <tr>
                                    <th>Giá</th>
                                    <td>{formatPrice(data.price)}</td>
                                </tr>
                                <tr>
                                    <th>Giá sale</th>
                                    <td>{formatPrice(data.price_sale)}</td>
                                </tr>
                                <tr>
                                    <th>Ngày bắt đầu</th>
                                    <td>{data.start_time}</td>
                                </tr>
                                <tr>
                                    <th>Ngày kết thúc</th>
                                    <td>{data.end_time}</td>
                                </tr>
                                <tr>
                                    <th>Trạng thái</th>
                                    <td>{data.status === 1 ? "Hiển thị" : "Ẩn"}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{data.created_at}</td>
                                </tr>
                                <tr>
                                    <th>Ngày cập nhật</th>
                                    <td>{data.updated_at}</td>
                                </tr>
                                <tr>
                                    <th>Người tạo</th>
                                    <td>{data.created_by}</td>
                                </tr>
                                <tr>
                                    <th>Người cập nhật</th>
                                    <td>{data.updated_by}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default DiscountedProductShow;