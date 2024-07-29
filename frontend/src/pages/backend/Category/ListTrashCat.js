import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiCategory from "../../../api/apiCategory";

function ListTrashCat() {

    const [listTrash, setListTrash] = useState([]);
    const [tamp, setTamp] = useState();

    useEffect(() => {
        apiCategory.getListTrash().then((res) => {
            try {
                const categoryData = res.map((item) => {
                    return {
                        id: item.id,
                        name: item.category_name,
                        slug: item.slug,
                        parent: item.parent_name
                    }
                });
                setListTrash(categoryData);
                setTamp();
            } catch (e) {
                console.log(e);
            }
        })
    }, [tamp])

    // rescover trash brand
    function rescoverTrashCategory(id) {
        apiCategory.rescoverTrash(id).then(function (result) {
            if (result.data !== null) {
                alert("Phục hồi thành công !");
                setTamp(result.data.id);
            }
            else {
                alert("Không tìm thấy dữ liệu !");
            }
        })
    }

    // xoa vinh vien
    const delCategory = async (id) => {
        apiCategory.delCatById(id).then((res) => {
            try {
                alert('Xóa dữ liệu thành công');
                setTamp(id);
            }
            catch (e) {
                console.log(e);
            }
        })
    }


    if (listTrash.length !== 0) {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-10">
                                <h1 className="d-inline">Thùng rác</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-header text-right">
                            <Link to="/admin/list-categories" className="btn btn-sm btn-info">
                                <i className="fa fa-reply me-1" aria-hidden="true"></i>
                                Quay lại
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="text-center" style={{ width: "30px" }}>
                                                    <input type="checkbox" />
                                                </th>
                                                <th>Id</th>
                                                {/* <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th> */}
                                                <th>Tên danh mục</th>
                                                <th>Tên slug</th>
                                                <th>Danh mục cha</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listTrash.map((item, index) => {
                                                return (
                                                    <tr className="datarow" key={index}>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                        <td>{item.id}</td>
                                                        {/* <td>
                                                                <img src="../public/images/category.jpg" alt="category.jpg" />
                                                            </td> */}
                                                        <td>
                                                            <div className="name">
                                                                {item.name}
                                                            </div>
                                                            <div className="function_style" style={{ fontSize: "14px" }}>
                                                                <Link to={`/admin/list-brands/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                                <button onClick={() => rescoverTrashCategory(item.id)} className="btn btn-sm"><i className="fa fa-history me-1" aria-hidden="true"></i>Phục hồi</button> |
                                                                <button onClick={() => delCategory(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                            </div>
                                                        </td>
                                                        <td>{item.slug}</td>
                                                        <td>{item.parent}</td>
                                                        {/* <td>{item.icon}</td>
                                                        <td>{item.description}</td> */}
                                                    </tr>

                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
    else {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-10">
                                <h1 className="d-inline">Thùng rác</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="card">
                        <div className="card-header text-right">
                            <Link to="/admin/list-categories" className="btn btn-sm btn-info">
                                <i className="fa fa-reply me-1" aria-hidden="true"></i>
                                Quay lại
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <p>Hiện tại không có rác !</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );

    }

}

export default ListTrashCat;