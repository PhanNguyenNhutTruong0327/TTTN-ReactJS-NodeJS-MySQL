import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiBanner from "../../../api/apiBanner";
import { imageURL } from "../../../api/config";
import axiosInstance from "../../../api/axios";
import apiUploadFile from "../../../api/apiUploadFile";

function ListTrashBanner() {

    const [banners, setBanners] = useState([]);
    const [qty, setQty] = useState(0);

    const [tamp, setTamp] = useState();

    useEffect(() => {
        apiBanner.getListTrash().then((res) => {
            try {
                setBanners(res.data.data);
                setQty(res.data.qty);

            } catch (e) {
                console.log(e);
            }
        })
        setTamp();
    }, [tamp])



    // phu hoi rac
    function rescoverTrashBanner(id) {
        apiBanner.rescoverTrash(id).then(function (result) {
            if (result.data.success === 'true') {
                alert(result.data.message);
                setTamp(id);
            }
            else {
                alert(result.data.message);
            }
        })
    }

    // hien thi
    function deleteBanner(id) {
        apiBanner.deleteBanner(id).then(function (result) {
            if (result.data.success === 'true') {
                alert(result.data.message);
                setTamp(id);
            }
            else {
                alert(result.data.message);
            }
        })
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-10">
                            <h1 className="d-inline">Danh sách thùng rác <sup>({qty})</sup></h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link to="/admin/list-banners" className="btn btn-sm btn-info">
                                <i className="fa fa-reply me-1" aria-hidden="true"></i>
                                Quay lại
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2">
                            </div>
                            <div className="col-md-8">
                                {banners.length > 0 ? (
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="text-center" style={{ width: "30px" }}>
                                                    <input type="checkbox" />
                                                </th>
                                                <th>Id</th>
                                                <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                                <th>Tên banner</th>

                                                <th>Vị trí</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {banners.map((item, index) => {
                                                return (
                                                    <tr className="datarow" key={index}>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <img src={imageURL + item.image} alt="banner" style={{ width: "100%" }} />
                                                        </td>
                                                        <td>
                                                            <div className="name">
                                                                {item.name}
                                                            </div>
                                                            <div className="function_style">
                                                                <Link to={`/admin/list-banners/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                                <button onClick={() => rescoverTrashBanner(item.id)} className="btn btn-sm"><i className="fa fa-history me-1" aria-hidden="true"></i>Phục hồi</button> |
                                                                <button onClick={() => deleteBanner(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                            </div>
                                                        </td>
                                                        <td>{item.position}</td>
                                                        <td>{item.status === 1 ? "Hiển thị" : "Ẩn"}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>

                                ) : (
                                    <div className="col-md-12 text-center">
                                        <p>Hiện tại không có rác !</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default ListTrashBanner;