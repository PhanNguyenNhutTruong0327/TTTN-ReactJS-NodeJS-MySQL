import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import apiCategory from "../../../api/apiCategory";

function CategoryShow() {

    const {id} = useParams();
    const [category, setCategory] = useState([]);

    useEffect(() => {
        apiCategory.getCategoryById(id).then((res) => {
            try {
               setCategory(res.data);
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
                        <Link to="/admin/list-categories" className="btn btn-sm btn-info">
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
                                    <td>{category.id}</td>
                                </tr>
                                <tr>
                                    <th>Tên danh mục</th>
                                    <td>{category.category_name}</td>
                                </tr>
                                <tr>
                                    <th>Slug</th>
                                    <td>{category.slug}</td>
                                </tr>
                                <tr>
                                    <th>Thứ tự</th>
                                    <td>{category.sort_order}</td>
                                </tr>
                                <tr>
                                    <th>Danh mục cha</th>
                                    <td>{category.parent_name}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{category.status === 1 ? "Hiển thị" : "Ẩn"}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{category.created_at}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default CategoryShow;