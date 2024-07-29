import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiSale from "../../../api/apiSale";
import apiProduct from "../../../api/apiProduct";
import { imageURL } from "../../../api/config";
import apiDiscountedPro from "../../../api/apiDiscountedPro";
import { format, parseISO } from 'date-fns';

function DiscountedUpdate() {

    const { id } = useParams();

    const navigate = useNavigate(); // chuyen trang


    const [sale_id, setSaleId] = useState(0);
    const [start_time, setStartTime] = useState('');
    const [end_time, setEndTime] = useState('');
    const [qty, setQty] = useState(1);
    const [status, setStatus] = useState(1);

    const [sales, setSales] = useState([]);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        apiDiscountedPro.getById(id).then((res)=>{
            setSaleId(res.data.sale_id);
            setStartTime(res.data.start_time);
            setEndTime(res.data.end_time);
            setQty(res.data.qty);
            setStatus(res.data.status);

            const start_time = parseISO(res.data.start_time);
            setStartTime(format(start_time, 'yyyy-MM-dd'));
            const end_time = parseISO(res.data.end_time);
            setEndTime(format(end_time, 'yyyy-MM-dd'));



            apiProduct.getProductById(res.data.product_id).then((res) => {
                setProduct(res.data.data)
            })
    
        })


        apiSale.getAllSales().then((res) => {
            try {
                setSales(res.data);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sale_id !== 0 && start_time !== '' && end_time !== '' && qty !== 0) {
            const data = {
                product_id: product.product_id,
                sale_id: sale_id,
                start_time: start_time,
                end_time: end_time,
                qty: qty,
                status: status
            }
            console.log(data);
            await apiDiscountedPro.updateDiscountedPro(data, id).then((res) => {
                if (Object.keys(res.data).length > 0) {
                    alert("Cập nhật dữ liệu thành công !")
                    navigate('/admin/discounted-products/1/10', { replace: true });
                }
                else {
                    alert("Cập nhật không thành công !")
                }
            })

        }
        else {
            alert("Vui lòng nhập đầy đủ thông tin !");
        }

    }

    return (
        <div className="content-wrapper">
            {console.log(start_time)}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-10">
                            <h1 className="d-inline">Cập nhật sản phẩm giảm giá</h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link to="/admin/discounted-products/1/10" className="btn btn-sm btn-info">
                                <i className="fa fa-reply me-1" aria-hidden="true"></i>
                                Quay lại
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <br />
                    {product.product_id ? (<div className="card-body">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <form onSubmit={handleSubmit} >

                                    <div className="mb-3">
                                        <label>Sản phẩm:</label>
                                        <span className="ps-2">{product.name}</span>
                                        <br />
                                        <div className="text-center">
                                            <img style={{ width: "auto", height: "150px" }} src={imageURL + product.image} alt="anh" />

                                        </div>
                                        <br />
                                        <label>Số lượng còn lại: </label>
                                        <span className="ms-2">{product.qty - product.qty_sold}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Chủ đề sale (*)</label>
                                        <select name="status" className="form-control" value={sale_id} onChange={(e) => setSaleId(e.target.value)}>
                                            <option value="0">None</option>
                                            {sales.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>

                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label>Ngày bắt đầu (*)</label>
                                        <input type="date" name="description" placeholder="Nhập mô tả bài viết" className="form-control"
                                            value={start_time} onChange={(e) => setStartTime(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Ngày kết thúc (*)</label>
                                        <input type="date" name="description" placeholder="Nhập mô tả bài viết" className="form-control"
                                            value={end_time} onChange={(e) => setEndTime(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Số lượng (*)</label>
                                        <input type="number" name="description" placeholder="Nhập mô tả bài viết" className="form-control"
                                            value={qty} onChange={(e) => setQty(e.target.value)} min={1} max={product.qty - product.qty_sold} />
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
                    ) : (
                        <div>
                            <p className="text-center">Không tìm thấy dữ liệu !</p>
                            <br />
                        </div>
                    )}
                </div>
            </section>
        </div>

    );
}

export default DiscountedUpdate;