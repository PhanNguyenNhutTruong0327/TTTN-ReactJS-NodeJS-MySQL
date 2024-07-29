import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import apiBrand from "../../../api/apiBrand";
import axiosInstance from "../../../api/axios";
import apiUploadFile from "../../../api/apiUploadFile";

function BrandUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [brandName, setBrandName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(2);
    const [icon_db, setIconDb] = useState('');

    const token = JSON.parse(localStorage.getItem('adminToken'));

    useEffect(() => {
        apiBrand.getBrandById(id).then((res) => {
            try {
                setBrandName(res.data.name);
                setDescription(res.data.description);
                setStatus(res.data.status);
                setIconDb(res.data.icon);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])



    const handleSubmit = async (e) => {

        const image = document.querySelector("#image");

        if (brandName != '' && description != '') {
            e.preventDefault();
            const brand = {
                name: brandName,
                description: description,
                status: status,
                updated_by: token.user.id,
                icon: icon_db
            };

            if (image.files.length > 0) {

                let file = new FormData();
                file.append("files", image.files[0]);

                axiosInstance.enableUploadFile();

                await apiUploadFile.uploadFile(file)
                    .then(async (res) => {
                        let filename = res.data.filename;
                        brand.icon = filename;

                    })
                    .catch(e => console.log(e))
            }

            axiosInstance.enableJson();
            await apiBrand.updateBrand(brand, id).then((res) => {
                if (res.data != null) {
                    alert("Cập nhật dữ liệu thành công !")
                    navigate('/admin/list-brands', { replace: true });
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
                        <div className="col-sm-10">
                            <h1 className="d-inline">Chỉnh sửa thương hiệu</h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link to="/admin/list-brands" className="btn btn-sm btn-info">
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
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <form onSubmit={handleSubmit} >

                                    <div className="mb-3">
                                        <label>Tên thương hiệu (*)</label>
                                        <input type="text" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                                    </div>
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
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default BrandUpdate;