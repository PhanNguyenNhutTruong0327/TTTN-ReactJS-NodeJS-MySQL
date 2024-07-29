import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageURL } from "../../../api/config";
import apiPost from "../../../api/apiPost";

function PostListTrash() {

    const { type } = useParams();
    const [data, setData] = useState([]);

    const page = parseInt(useParams().page);
    const limit = parseInt(useParams().limit);

    const [pages, setPages] = useState(1);

    const [qty_data, setQtyData] = useState(0);

    const [tamp, setTamp] = useState();



    useEffect(() => {
        apiPost.getListTrash(type, page, limit).then((res) => {
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


            } catch (e) {
                console.log(e);
            }
            setTamp();
        })
    }, [tamp, page])



    // phuc hoi
    function rescoverTrash(id) {
        apiPost.rescoverTrash(id).then(function (result) {
            if (result.data.success === 'true') {
                alert(result.data.message);
                setTamp(id)
            }
            else {
                alert(result.data.message);
            }

        })
    }

    // xoa 
    function deletePost(id) {
        apiPost.deletePost(id).then(function (result) {
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
                            <h1 className="d-inline">Thùng rác <sup>({qty_data})</sup></h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link to="/admin/list-post/news/1/10" className="btn btn-sm btn-info">
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
                        {data.length > 0 ? (
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
                                                <th>Tên bài viết</th>
                                                {/* <th>Tên slug</th> */}
                                                <th style={{ width: "400px" }}>Mô tả ngắn</th>
                                                <th>Chủ đề</th>
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
                                                                <Link to={`/admin/list-post/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                                <button onClick={() => rescoverTrash(item.id)} className="btn btn-sm"><i className="fa fa-history me-1" aria-hidden="true"></i>Phục hồi</button> |
                                                                <button onClick={() => deletePost(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                            </div>
                                                        </td>
                                                        {/* <td>{item.slug}</td> */}
                                                        <td>
                                                            <p style={{ width: "100%", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                                                        </td>
                                                        <td>{item.name_topic}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <ul className="pagination">
                                    <li className="page-item">
                                        {page > 1 ? (
                                            <Link className="page-link" to={`/admin/list-post/list-trash/${type}/${page - 1}/${limit}`}>Previous</Link>
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
                                                to={`/admin/list-post/list-trash/${type}/${index + 1}/${limit}`}
                                            >
                                                {index + 1}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <Link className="page-link" to={`/admin/list-post/list-trash/${type}/${page + 1}/${limit}`}>
                                            Next
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        ) : (
                        <div className="col-md-12 text-center">
                            <p>Hiện tại không có rác !</p>
                        </div>
                        )}
                    </div>
                </div>
            </section>
        </div>

    );
}

export default PostListTrash;