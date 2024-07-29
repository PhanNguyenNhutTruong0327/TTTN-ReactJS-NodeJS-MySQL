import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiBrand from "../../../api/apiBrand";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import apiUploadFile from "../../../api/apiUploadFile";
import axiosInstance from "../../../api/axios";
import { imageURL } from "../../../api/config";

function ListBrand() {

    const [brands, setBrands] = useState([]);

    const [brandName, setBrandName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(2);

    const [qty_trash, setQtyTrash] = useState(0);
    const [qty_brand, setQtyBrand] = useState(0);

    const [tamp, setTamp] = useState();
    const [trash, setTrash] = useState();

    const token = JSON.parse(localStorage.getItem('adminToken'));


    useEffect(() => {
        apiBrand.getAll().then((res) => {
            try {
                const data = res.data;
                const brandData = data.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        image: item.image,
                        icon: item.icon,
                        description: item.description,
                        status: item.status
                    }
                });
                setBrands(brandData);
                setQtyBrand(res.qty_brand);
                setQtyTrash(res.qty_trash);

                setTrash();
                setTamp();

            } catch (e) {
                console.log(e);
            }
        })
    }, [tamp, trash])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const image = document.querySelector("#image");

        if (brandName !== '' && description !== '' && image.files.length !== 0) {
            e.preventDefault();
            const brand = {
                name: brandName,
                description: description,
                status: status,
                icon: "",
                created_by: token.user.id
            };

            let file = new FormData();
            file.append("files", image.files[0]);

            axiosInstance.enableUploadFile();

            apiUploadFile.uploadFile(file)
                .then(async (res) => {
                    let filename = res.data.filename;
                    brand.icon = filename;

                    axiosInstance.enableJson();
                    const responseBrand = await apiBrand.createBrand(brand)
                    if(responseBrand.data !== null){
                        alert('Thêm dữ liệu thành công !');
                        setTamp(responseBrand.data.id);
                    }else{
                        alert('Thêm dữ liệu thất bại !');
                    }
                })
                .catch(e => console.log(e))

        }
        else {
            e.preventDefault();
            alert('Vui lòng nhập đầu đủ thông tin !')
        }


    };


    // trash brand
    function trashBrand(id) {
        apiBrand.trashBrand(id).then(function (result) {
            if (result.data.success === "true") {
                alert(result.data.message);
                setTrash(id);
            }
            else {
                alert(result.data.message);
            }
        })
    }

    // hien thi
    function displayBrand(id) {
        apiBrand.displayBrand(id).then(function (result) {
            if (result.data !== null) {
                alert("Cập nhật thành công !");
                setTrash(id);
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
                            <h1 className="d-inline">Tất cả thương hiệu <sup>({qty_brand})</sup></h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link class="action-btn" to="/admin/list-brands/list-trash" style={{ color: "red" }}>
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
                                        <label>Tên thương hiệu (*)</label>
                                        <input type="text" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                                    </div>
                                    {/* <div className="mb-3">
                                        <label>Slug</label>
                                        <input type="text" name="slug" id="slug" placeholder="Nhập slug" className="form-control" />
                                    </div> */}
                                    {/* <div className="mb-3">
                                        <label>Hình đại diện</label>
                                        <input type="file" name="image" className="form-control" />
                                    </div> */}
                                    <div className="mb-3">
                                        <label>Mô tả (*)</label>
                                        <input type="text" name="description" placeholder="Nhập mô tả thương hiệu" className="form-control"
                                            value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <div class="mb-3">
                                        <label>Icon</label>
                                        <input type="file" name="image" id="image" class="form-control" />
                                    </div>

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
                                            <th>Tên thương hiệu</th>
                                            <th>Tên slug</th>
                                            <th>Icon</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {brands.map((item, index) => {
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
                                                            <button onClick={() => displayBrand(item.id)} className="btn btn-sm">{item.status === 2 ? "Hiện" : "Ẩn"}</button> |
                                                            <Link to={`/admin/list-brands/update/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                            <Link to={`/admin/list-brands/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                            <button onClick={() => trashBrand(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                        </div>
                                                    </td>
                                                    <td>{item.slug}</td>
                                                    <td><img src={imageURL + item.icon} style={{ width: "50%", height: "40%" }} /></td>
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

export default ListBrand;