import { useEffect, useState } from "react";
import apiCategory from "../../../api/apiCategory";
import { Link } from "react-router-dom";

function ListCategories() {

    const [categories, setCategoies] = useState([]);
    const [catName, setCatName] = useState('');
    const [parent, setParent] = useState(0);
    const [sortOrder, setSortOrder] = useState(0);
    const [status, setStatus] = useState(2);

    const [qty_trash, setQtyTrash] = useState(0);
    const [qty_cat, setQtyCat] = useState(0);

    const [tamp, setTamp] = useState();
    const [trash, setTrash] = useState();
    // const [nameButton, setNameButton] = useState('An')
    // useEffect(() => {
    //     (async function () {
    //         await apiCategory.getAll().then((res) => {
    //             try {
    //                 console.log(res);
    //                 const categoryData = res.map((item) => {
    //                     return {
    //                         id: item.id,
    //                         name: item.category_name,
    //                         slug: item.slug,
    //                         parent: item.parent_name,
    //                         sort_order: item.sort_order
    //                     }
    //                 });
    //                 setCategoies(categoryData);
    //             } catch (e) {
    //                 console.log(e);
    //             }
    //         })
    //     })()
    // }, [])

    useEffect(() => {
        apiCategory.getAll().then((res) => {
            try {
                console.log(res);
                const data =res.data;
                const categoryData = data.map((item) => {
                    // if(item.status === 2){
                    //     setNameButton('Hien')
                    // }
                    return {
                        id: item.id,
                        name: item.category_name,
                        slug: item.slug,
                        parent: item.parent_name,
                        sort_order: item.sort_order,
                        status: item.status,
                    }
                });
                setCategoies(categoryData);
                setQtyCat(res.qty_categories);
                setQtyTrash(res.qty_trash);

            } catch (e) {
                console.log(e);
            }
        })
    }, [tamp, trash])


    const handleSubmit = async (e) => {
        if (catName !== '') {
            e.preventDefault();
            const category = {
                category_name: catName,
                parent: parent,
                sort_order: sortOrder,
                status: status
            };

            await apiCategory.createCategory(category).then((res) => {
                if (res.data != null) {
                    alert("Thêm dữ liệu thành công !")
                    setTamp(res.data.id);
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

    // trash cat
    function trashCategory(id) {
        apiCategory.trashCategory(id).then(function (result) {
            if (result.data.success == 'true') {
                alert(result.data.message);
                setTrash(id);
            }
            else {
                alert(result.data.message);
            }
        })
    }

    // hien thi
    function displayCategory(id) {
        apiCategory.displayCat(id).then(function (result) {
            if (result.data !== null) {
                alert("Cập nhật thành công !");
                setTrash(result.data.id);
            }
            else {
                alert("Không tìm thấy dữ liệu !");
            }
        })
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-10">
                            <h1 className="d-inline">Tất cả danh mục <sup>({qty_cat})</sup></h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link class="action-btn" to="/admin/list-categories/list-trash" style={{ color: "red" }}>
                                <i class="fa fa-trash" aria-hidden="true"></i>
                                <sup class="count ms-1">{qty_trash}</sup>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
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
                            
                                            <th>Danh mục cha</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((item, index) => {
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
                                                        <div className="function_style">
                                                            <button onClick={() => displayCategory(item.id)} className="btn btn-sm">{item.status === 2 ? "Hiện" : "Ẩn"}</button> |
                                                            <Link to={`/admin/list-categories/update/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                            <Link to={`/admin/list-categories/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                            <button onClick={() => trashCategory(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                        </div>
                                                    </td>
                                                    <td>{item.parent}</td>
                                                    <td>{item.status === 1 ? "Hiển thị" : "Ẩn"}</td>
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

export default ListCategories;