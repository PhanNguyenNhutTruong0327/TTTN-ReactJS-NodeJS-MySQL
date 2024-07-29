import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiUploadFile from "../../../api/apiUploadFile";
import axiosInstance from "../../../api/axios";
import apiBrand from "../../../api/apiBrand";
import apiCategory from "../../../api/apiCategory";
import apiProduct from "../../../api/apiProduct";

function ProductUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState('');
    const [brand_id, setBrandId] = useState(0);
    const [category_id, setCategoryId] = useState(0);
    const [detail_1, setDetail1] = useState('');
    const [detail_2, setDetail2] = useState('');
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState(2);

    const [chip, setChip] = useState('');
    const [screen, setScreen] = useState('');
    const [rear_camera, setRearCamera] = useState('');
    const [front_camera, setFrontCamera] = useState('');
    const [operating_system, setOperatingSystem] = useState('');
    const [ram, setRam] = useState('');
    const [rom, setRom] = useState('');
    const [pin, setPin] = useState('');
    const [size, setSize] = useState('');
    const [connect, setConnect] = useState('');
    const [qty, setQty] = useState(0);
    const [image_db, setImageDb] = useState('');
    const [image_detail_db, setImageDetailDb] = useState('');

    const token = JSON.parse(localStorage.getItem('adminToken'));


    useEffect(() => {
        (async () => {
            await apiProduct.getProductById(id).then(res => {
                const product = res.data.data;
                setName(product.name);
                setDetail1(product.detail_1);
                setDetail2(product.detail_2);
                setChip(product.chip);
                setScreen(product.screen);
                setFrontCamera(product.front_camera);
                setRearCamera(product.rear_camera);
                setOperatingSystem(product.operating_system);
                setRam(product.ram);
                setRom(product.rom);
                setPin(product.pin);
                setSize(product.size);
                setConnect(product.connect);
                setBrandId(product.brand_id);
                setCategoryId(product.category_id);
                setPrice(product.price);
                setQty(product.qty);
                setStatus(product.status);
                setImageDb(product.image);
                setImageDetailDb(product.image_detail);
            })

            await apiBrand.getAll().then(res => {
                setBrands(res.data);
            });

            apiCategory.getAll().then(res => {
                setCategories(res.data);
            });
        })()
    }, [])


    const uploadImages = async (files) => {
        const imageUrls = await Promise.all(
            files.map(async (file) => {
                let formData = new FormData();
                formData.append("files", file);
                axiosInstance.enableUploadFile();

                const res = await apiUploadFile.uploadFile(formData);
                return res.data.filename;
            })
        );

        return imageUrls;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const image = document.querySelector("#image");
        const image_detail = document.querySelector("#image_detail");

        if (name !== '' && detail_1 !== '' && detail_2 !== '') {

            const data = {
                product: {
                    name: name,
                    brand_id: brand_id,
                    category_id: category_id,
                    price: price,
                    image: image_db,
                    image_detail: image_detail_db,
                    detail_1: detail_1,
                    detail_2: detail_2,
                    status: status,
                    created_by: token.user.id
                },
                description: {
                    chip: chip,
                    screen: screen,
                    rear_camera: rear_camera,
                    front_camera: front_camera,
                    operating_system: operating_system,
                    ram: ram,
                    rom: rom,
                    pin: pin,
                    size: size,
                    connect: connect
                },
                qty: qty
            };
            console.log(data);

            if (image.files.length > 0) {
                const imageUrls = await uploadImages([
                    image.files[0],
                ]);
                data.product.image = imageUrls[0];
            }

            if (image_detail.files.length > 0) {
                const imageUrls = await uploadImages([
                    image_detail.files[0],
                ]);
                data.product.image_detail = imageUrls[0];
            }

            axiosInstance.enableJson();
            const responsePost = await apiProduct.updateProduct(data, id);
            if (responsePost.data !== null) {
                alert('Cập nhật dữ liệu thành công !');
                navigate('/admin/list-products/1/10', { replace: true });
            } else {
                alert('Cập nhật dữ liệu thất bại !');
            }

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
                            <h1 className="d-inline">Cập nhật sản phẩm</h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link to="/admin/list-products/1/10" className="btn btn-sm btn-info">
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
                            {/* <div className="col-md-1"></div> */}
                            <div className="col-md">
                                <form onSubmit={handleSubmit} className="row">
                                    <div className="col-8" >
                                        <div className="mb-3">
                                            <label>Tên sản phẩm (*)</label>
                                            <input type="text" name="name" placeholder="Nhập tên sản phẩm" className="form-control"
                                                value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label>Mô tả chi tiết 1(*)</label>
                                            <textarea rows="12" type="text" name="description" placeholder="Nhập mô tả sản phẩm" className="form-control"
                                                value={detail_1} onChange={(e) => setDetail1(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label>Mô tả chi tiết 2(*)</label>
                                            <textarea rows="12" type="text" name="description" placeholder="Nhập chi tiết sản phẩm" className="form-control"
                                                value={detail_2} onChange={(e) => setDetail2(e.target.value)} />
                                        </div>
                                        {chip !== '' && screen !== "" ? (
                                            <>
                                                <div className="mb-3">
                                                    <label>Chip (*)</label>
                                                    <input type="text" name="name" placeholder="Nhập thông tin chip" className="form-control"
                                                        value={chip} onChange={(e) => setChip(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Màng hình (*)</label>
                                                    <input type="text" name="name" placeholder="Nhập thông tin màng hình" className="form-control"
                                                        value={screen} onChange={(e) => setScreen(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Camera trước</label>
                                                    <input type="text" name="name" placeholder="Nhập thông tin camera" className="form-control"
                                                        value={front_camera} onChange={(e) => setFrontCamera(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Camera sau</label>
                                                    <input type="text" name="name" placeholder="Nhập thông tin camera" className="form-control"
                                                        value={rear_camera} onChange={(e) => setRearCamera(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Hệ điều hành (*)</label>
                                                    <input type="text" name="name" placeholder="Nhập thông tin hệ điều hành" className="form-control"
                                                        value={operating_system} onChange={(e) => setOperatingSystem(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Ram (*)</label>
                                                    <input type="text" name="name" placeholder="Nhập thông tin ram" className="form-control"
                                                        value={ram} onChange={(e) => setRam(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Dung lượng lưu trữ (*)</label>
                                                    <input type="text" name="name" placeholder="Nhập dung lượng lưu trữ" className="form-control"
                                                        value={rom} onChange={(e) => setRom(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Pin (*)</label>
                                                    <input type="text" name="name" placeholder="Nhập thông tin pin" className="form-control"
                                                        value={pin} onChange={(e) => setPin(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Kích thước (*)</label>
                                                    <input type="text" name="name" placeholder="Nhập kích thước" className="form-control"
                                                        value={size} onChange={(e) => setSize(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Kết nối (*)</label>
                                                    <input type="text" name="name" placeholder="Nhập thông tin kết nối" className="form-control"
                                                        value={connect} onChange={(e) => setConnect(e.target.value)} />
                                                </div>
                                            </>
                                        ) : (<></>)}
                                    </div>

                                    <div className="col-4">
                                        <div className="mb-3">
                                            <label>Danh mục (*)</label>
                                            <select name="status" className="form-control" value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
                                                <option value="0">None</option>
                                                {categories.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.category_name}</option>

                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label>Thương hiệu (*)</label>
                                            <select name="status" className="form-control" value={brand_id} onChange={(e) => setBrandId(e.target.value)}>
                                                <option value="0">None</option>
                                                {brands.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.name}</option>

                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label>Giá (*)</label>
                                            <input type="text" name="name" placeholder="Nhập giá sản phẩm" className="form-control"
                                                value={price} onChange={(e) => setPrice(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label>Số lượng (*)</label>
                                            <input type="text" name="name" placeholder="Nhập số lượng" className="form-control"
                                                value={qty} onChange={(e) => setQty(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label>Hình ảnh (*)</label>
                                            <input id="image" type="file" name="image" className="form-control" />
                                            <br />
                                            <label>Hình ảnh chi tiết(*)</label>
                                            <input id="image_detail" type="file" name="image" className="form-control" />
                                            <br />
                                        </div>
                                        <div className="mb-3">
                                            <label>Trạng thái</label>
                                            <select name="status" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                <option value="1">Xuất bản</option>
                                                <option value="2">Chưa xuất bản</option>
                                            </select>
                                        </div>
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

export default ProductUpdate;