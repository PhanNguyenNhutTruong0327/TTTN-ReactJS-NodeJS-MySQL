import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import apiBanner from "../../../api/apiBanner";
import axiosInstance from "../../../api/axios";
import apiUploadFile from "../../../api/apiUploadFile";

function BannerUpdate() {
    const { id } = useParams();

    const navigate = useNavigate();


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [image_db, setImageDB] = useState('');
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState(0);

    const token = JSON.parse(localStorage.getItem('adminToken'));



    useEffect(() => {

        apiBanner.getOne(id).then((res) => {
            try {
                setName(res.data.name);
                setDescription(res.data.description);
                setLink(res.data.link);
                setImageDB(res.data.image);
                setPosition(res.data.position);
                setStatus(res.data.status);
            } catch (e) {
                console.log(e);
            }
        })

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const image = document.querySelector("#image");
        if (name !== '' && description !== '' && position !== '') {
            const banner = {
                name: name,
                description: description,
                link: link,
                position: position,
                status: status,
                updated_by: 1,
                image: image_db,
                updated_by: token.user.id
            };

            if (image.files.length > 0) {

                let file = new FormData();
                file.append("files", image.files[0]);

                axiosInstance.enableUploadFile();

                await apiUploadFile.uploadFile(file)
                    .then(async (res) => {
                        let filename = res.data.filename;
                        banner.image = filename;

                    })
                    .catch(e => console.log(e))
            }

            
            console.log(banner);

            axiosInstance.enableJson();
            await apiBanner.updateBanner(banner, id).then(res => {
            console.log(banner);

                if (res.data !== null) {
                    alert('Cập nhật dữ liệu thành công !');
                    navigate('/admin/list-banners', { replace: true });
                } else {
                    alert('Cập nhật dữ liệu thất bại !');
                }
            })
        }
        else {
            e.preventDefault();
            alert('Vui lòng nhập đầu đủ thông tin !')
        }
    };


    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-10">
                            <h1 className="d-inline">Chỉnh sửa bannner</h1>
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
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <form onSubmit={handleSubmit} >

                                    <div className="mb-3">
                                        <label>Tên banner (*)</label>
                                        <input type="text" name="name" placeholder="Nhập tên" className="form-control"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Mô tả ngắn (*)</label>
                                        <input type="text" name="name" placeholder="Nhập mô tả ngắn" className="form-control"
                                            value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Link (*)</label>
                                        <input type="text" name="name" placeholder="Nhập đường dẫn" className="form-control"
                                            value={link} onChange={(e) => setLink(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Vị trí (*)</label>
                                        <select name="position" className="form-control" onChange={(e) => setPosition(e.target.value)} value={position} >

                                            <option value="slider-main">Slider chính</option>
                                            <option value="banner">Banner</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label>Hình ảnh </label>
                                        <input id="image" type="file" name="image" className="form-control" />
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

export default BannerUpdate;