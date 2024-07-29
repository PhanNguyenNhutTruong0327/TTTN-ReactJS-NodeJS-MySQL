import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiBanner from "../../../api/apiBanner";
import { imageURL } from "../../../api/config";
import axiosInstance from "../../../api/axios";
import apiUploadFile from "../../../api/apiUploadFile";

function ListBanner() {

    const [banners, setBanners] = useState([]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('/');
    const [position, setPosition] = useState('slider-main');
    const [status, setStatus] = useState(2);

    const [qty_trash, setQtyTrash] = useState(0);
    const [qty, setQty] = useState(0);

    const [tamp, setTamp] = useState();

    const token = JSON.parse(localStorage.getItem('adminToken'));

    useEffect(() => {
        apiBanner.getAllBannerBE().then((res) => {
            try {
                setBanners(res.data.data);
                setQty(res.data.qty);
                setQtyTrash(res.data.qty_trash);

            } catch (e) {
                console.log(e);
            }
        })
        setName('');
        setDescription('');
        setTamp();
    }, [tamp])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const image = document.querySelector("#image");
        if (name !== '' && description !== '' && image.files.length !== 0 && position !== '') {
            e.preventDefault();
            const banner = {
                name: name,
                description: description,
                link:link,
                position: position,
                status: status,
                image: "",
                created_by: token.user.id
            };

            let file = new FormData();
            file.append("files", image.files[0]);

            axiosInstance.enableUploadFile();

            apiUploadFile.uploadFile(file)
                .then(async (res) => {
                    let filename = res.data.filename;
                    banner.image = filename;

                    axiosInstance.enableJson();
                    const responseBanner = await apiBanner.createBanner(banner)
                    if(responseBanner.data !== null){
                        alert('Thêm dữ liệu thành công !');
                        setTamp(responseBanner.data.id);
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

    // trash cat
    function trashBanner(id) {
        apiBanner.trashBanner(id).then(function (result) {
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
    function displayBanner(id) {
        apiBanner.displayBanner(id).then(function (result) {
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
            {console.log("create",token.jwt)}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-10">
                            <h1 className="d-inline">Tất cả Banner <sup>({qty})</sup></h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link class="action-btn" to="/admin/list-banners/list-trash" style={{ color: "red" }}>
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
                            <div className="col-md-8">
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
                                                            <button onClick={() => displayBanner(item.id)} className="btn btn-sm">{item.status === 2 ? "Hiện" : "Ẩn"}</button> |
                                                            <Link to={`/admin/list-banners/update/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                            <Link to={`/admin/list-banners/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                            <button onClick={() => trashBanner(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                        </div>
                                                    </td>
                                                    <td>{item.position}</td>
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

export default ListBanner;