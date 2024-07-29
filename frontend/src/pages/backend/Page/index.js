import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageURL } from "../../../api/config";
import apiPost from "../../../api/apiPost";
import apiPage from "../../../api/apiPage";

function ListPage() {

    const [data, setData] = useState([]);

    const page = parseInt(useParams().page);
    const limit = parseInt(useParams().limit);

    const [pages, setPages] = useState(1);

    const [qty_data, setQtyData] = useState(0);
    const [qty_trash, setQtyTrash] = useState(0);

    const [tamp, setTamp] = useState();



    useEffect(() => {
        apiPage.getAllPage(page, limit).then((res) => {
            try {
                console.log(res.data)
                const numberOfPages = res.meta.pagination.pageCount;
                setPages(numberOfPages);
                const postData = res.data.map((item, index) => {
                    return {
                        id: item.id,
                        name_topic: item.name_topic,
                        title: item.title,
                        image: item.image_1,
                        slug: item.slug,
                        description: item.description_1,
                        status: item.status,
                    }
                }
                )
                setData(postData);
                setQtyData(res.meta.pagination.total);
                setQtyTrash(res.meta.pagination.qty_trash);


            } catch (e) {
                console.log(e);
            }
            setTamp();
        })
    }, [tamp, page])



    // trash cat
    function trashPost(id) {
        apiPost.trashPost(id).then(function (result) {
            if (result.data.success === 'true') {
                alert(result.data.message);
                setTamp(id)
            }
            else {
                alert(result.data.message);
            }

        })
    }

    // hien thi
    function displayPost(id) {
        apiPost.displayPost(id).then(function (result) {
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
            {console.log(data)}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-10">
                            <h1 className="d-inline">Tất cả trang đơn <sup>({qty_data})</sup></h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link class="action-btn" to="/admin/page/list-trash/1/10" style={{ color: "red" }}>
                                <i class="fa fa-trash" aria-hidden="true"></i>
                                <sup class="count ms-1">{qty_trash}</sup>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="text-right pt-2 pe-4">
                        <Link class="btn btn-success" to="/admin/page/create">
                            Tạo trang đơn
                        </Link>

                    </div>
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "30px" }}>
                                                <input type="checkbox" />
                                            </th>
                                            <th>Id</th>
                                            <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                            <th>Tiêu đề</th>
                                            {/* <th>Tên slug</th> */}
                                            <th style={{ width: "400px" }}>Mô tả ngắn</th>
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
                                                        <img src={imageURL + item.image} alt="product.jpg" style={{ width: "100%" }} />
                                                    </td>
                                                    <td style={{ width: "30%" }}>
                                                        <div className="name">
                                                            {item.title}
                                                        </div>
                                                        <div className="function_style">
                                                            <button onClick={() => displayPost(item.id)} className="btn btn-sm">{item.status === 2 ? "Hiện" : "Ẩn"}</button> |
                                                            <Link to={`/admin/page/update/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                            <Link to={`/admin/page/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                            <button onClick={() => trashPost(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                        </div>
                                                    </td>
                                                    {/* <td>{item.slug}</td> */}
                                                    <td>
                                                        <p style={{ width: "100%", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                                                    </td>
                                                    <td>{item.status === 2 ? "Ẩn" : "Hiển thị"}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* <ul className="pagination">
                                <li className="page-item">
                                    {page > 1 ? (
                                        <Link className="page-link" to={`/admin/pages/${page - 1}/${limit}`}>Previous</Link>
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
                                            to={`/admin/pages/${index + 1}/${limit}`}
                                        >
                                            {index + 1}
                                        </Link>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <Link className="page-link" to={`/admin/pages/${page + 1}/${limit}`}>
                                        Next
                                    </Link>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default ListPage;