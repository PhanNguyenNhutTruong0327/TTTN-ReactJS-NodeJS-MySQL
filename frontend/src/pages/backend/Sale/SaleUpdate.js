import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import apiSale from "../../../api/apiSale";

function SaleUpdate() {
    const { id } = useParams();

    const navigate = useNavigate(); // chuyen trang


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [percent_sale, setPercentSale] = useState(0);
    const [price_sale, setPriceSale] = useState(0);
    const [status, setStatus] = useState(2);

    const token = JSON.parse(localStorage.getItem('adminToken'));


    useEffect(() => {

        apiSale.getSaleById(id).then((res) => {
            try {
                setName(res.data.name);
                setPercentSale(res.data.percent_sale);
                setPriceSale(res.data.price_sale);
                setDescription(res.data.description);
                setStatus(res.data.status);
            } catch (e) {
                console.log(e);
            }
        })

    }, [])

    const handleSubmit = async (e) => {
        if (name !== '' && description !== '') {
            e.preventDefault();
            const sale = {
                name: name,
                description: description,
                percent_sale:percent_sale,
                price_sale:price_sale,
                status: status,
                updated_by: token.user.id
            };

            await apiSale.updateSale(sale, id).then((res) => {
                if (res.data != null) {
                    alert("Cập nhật dữ liệu thành công !")
                    navigate('/admin/list-sale', { replace: true });
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
                            <h1 className="d-inline">Chỉnh sửa chủ đề sale</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/admin/list-sale" className="btn btn-sm btn-info">
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
                                        <label>Tên chủ đề (*)</label>
                                        <input type="text" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Mô tả (*)</label>
                                        <textarea type="areatext" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Phần trăm sale</label>
                                        <input type="number" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={percent_sale} onChange={(e) => setPercentSale(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Giá sale</label>
                                        <input type="number" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={price_sale} onChange={(e) => setPriceSale(e.target.value)} />
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

export default SaleUpdate;