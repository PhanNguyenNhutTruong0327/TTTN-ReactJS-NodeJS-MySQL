import { useEffect, useState } from "react";
import apiCategory from "../../../api/apiCategory";
import { Link, useParams, useNavigate } from "react-router-dom";

function CategoryUpdate() {
    const { id } = useParams();

    const navigate = useNavigate(); // chuyen trang

    const [categories, setCategoies] = useState([]);

    const [catName, setCatName] = useState('');
    const [parent, setParent] = useState(0);
    const [sortOrder, setSortOrder] = useState(0);
    const [status, setStatus] = useState(2);



    useEffect(() => {

        apiCategory.getCategoryById(id).then((res) => {
            try {
                setCatName(res.data.category_name);
                setParent(res.data.parent);
                setSortOrder(res.data.sort_order);
                setStatus(res.data.status);
            } catch (e) {
                console.log(e);
            }
        })

        apiCategory.getAll().then((res) => {
            try {
                const data = res.data;
                const categoryData = data.map((item) => {
                    return {
                        id: item.id,
                        name: item.category_name,
                        slug: item.slug,
                        parent: item.parent_name,
                        sort_order: item.sort_order
                    }
                });
                setCategoies(categoryData);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])

    const handleSubmit = async (e) => {
        if (catName != '') {
            e.preventDefault();
            const category = {
                category_name: catName,
                parent: parent,
                sort_order: sortOrder,
                status: status
            };

            await apiCategory.updateCategory(category, id).then((res) => {
                if (res.data != null) {
                    alert("Cập nhật dữ liệu thành công !")
                    navigate('/admin/list-categories', { replace: true });
                }
                else {
                    alert("Không thành công !")
                }
            })
        }
        else {
            e.preventDefault();
            alert('Vui lòng nhập đầu đủ thông tin !')
        }
    }


    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Chỉnh sửa danh mục</h1>
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
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <form onSubmit={handleSubmit} >

                                    <div className="mb-3">
                                        <label>Tên danh mục (*)</label>
                                        <input type="text" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={catName} onChange={(e) => setCatName(e.target.value)} />
                                    </div>
                                    {/* <div className="mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" id="slug" placeholder="Nhập slug" className="form-control" />
                                </div> */}
                                    <div className="mb-3">
                                        <label>Danh mục cha (*)</label>
                                        <select name="parent_id" className="form-control" onChange={(e) => setParent(e.target.value)} value={parent}>
                                            <option value="0">None</option>
                                            {categories.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={index}>{item.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label>Sắp xếp (*)</label>
                                        <select name="sort_order" className="form-control" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} >
                                            <option value="0">None</option>
                                            {categories.map((item, index) => {
                                                return (
                                                    <option value={item.sort_order + 1} key={index}>Sau: {item.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    {/* <div className="mb-3">
                                    <label>Hình đại diện</label>
                                    <input type="file" name="image" className="form-control" />
                                </div> */}
                                    <div className="mb-3">
                                        <label>Trạng thái</label>
                                        <select name="status" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="1">Xuất bản</option>
                                            <option value="2">Chưa xuất bản</option>
                                        </select>
                                    </div>
                                    <div className="card-header text-right">
                                        <button className="btn btn- btn-success">
                                            <i className="fa fa-save me-2" aria-hidden="true"></i>
                                            Lưu
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default CategoryUpdate;