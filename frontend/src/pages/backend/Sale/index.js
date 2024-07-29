import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiSale from "../../../api/apiSale";

function ListSale() {

    const [sales, setSales] = useState([]);

    const [name, setName] = useState('');
    const [percent_sale, setPercentSale] = useState(0);
    const [price_sale, setPriceSale] = useState(0);
    const [description, setDescrition] = useState('');
    const [status, setStatus] = useState(2);

    const [qty_sale, setQtySale] = useState(0);
    const [qty_trash, setQtyTrash] = useState(0);

    const [tamp, setTamp] = useState();
    const [trash, setTrash] = useState();

    const token = JSON.parse(localStorage.getItem('adminToken'));


    useEffect(() => {
        apiSale.getAll().then((res) => {
            try {
                console.log(res.data.data);
                // const saleData = res.map((item) => {
                //     // if(item.status === 2){
                //     //     setNameButton('Hien')
                //     // }
                //     return {
                //         id: item.id,
                //         name: item.name,
                //         slug: item.slug,
                //         parent: item.parent_name,
                //         description: item.description,
                //         status: item.status
                //     }
                // });
                setSales(res.data.data);
                setQtySale(res.data.qty_sale);
                setQtyTrash(res.data.qty_trash);
                setTrash();
                
            } catch (e) {
                console.log(e);
            }
            setTamp();
        })
    }, [tamp, trash])


    const handleSubmit = async (e) => {
        if (name !== '' && description !== '') {
            e.preventDefault();
            const sale = {
                name: name,
                description: description,
                percent_sale: percent_sale,
                price_sale: price_sale,
                status: status,
                created_by: token.user.id
            };
            console.log(sale);
            await apiSale.createSale(sale).then((res) => {
                if (res.data != null) {
                    alert("Thêm dữ liệu thành công !")
                    setTamp(res.data.id);
                    setName('')
                    setDescrition('')
                    setPercentSale(0)
                    setPriceSale(0)
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
    function trashSale(id) {
        apiSale.trashSale(id).then(function (result) {
            alert(result.data.message);
            setTamp(true)

        })
    }

    // hien thi
    function displaySale(id) {
        apiSale.displaySale(id).then(function (result) {
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
                            <h1 className="d-inline">Tất cả sale <sup>({qty_sale})</sup></h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link class="action-btn" to="/admin/list-sale/list-trash" style={{ color: "red" }}>
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
                                        <label>Tên chủ đề sale (*)</label>
                                        <input type="text" name="name" placeholder="Nhập tên chủ đề sale" className="form-control"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Mô tả(*)</label>
                                        <input type="text" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={description} onChange={(e) => setDescrition(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label>Phần trăm sale</label>
                                        <input value={percent_sale} onChange={(e) => setPercentSale(e.target.value)} type="number" name="slug" id="slug" placeholder="Nhập phần trăm sale" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Giá giảm</label>
                                        <input value={price_sale} onChange={(e) => setPriceSale(e.target.value)} type="number" name="slug" id="slug" placeholder="Nhập giá sale" className="form-control" />
                                    </div>

                                    {/* <div className="mb-3">
                                        <label>Sắp xếp (*)</label>
                                        <select name="sort_order" className="form-control" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} >
                                            <option value="0">None</option>
                                            {categories.map((item, index) => {
                                                return (
                                                    <option value={item.sort_order + 1} key={index}>Sau: {item.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div> */}
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
                                            <th>Tên chủ đề sale</th>
                                            <th>Phần trăm sale</th>
                                            <th>Giá sale</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.map((item, index) => {
                                            return (
                                                <tr className="datarow" key={index}>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td>{item.id}</td>
                                                    <td style={{ width: "50%" }}>
                                                        <div className="name">
                                                            {item.name}
                                                        </div>
                                                        <div className="function_style">
                                                            <button onClick={() => displaySale(item.id)} className="btn btn-sm">{item.status === 2 ? "Hiện" : "Ẩn"}</button> |
                                                            <Link to={`/admin/list-sale/update/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                            <Link to={`/admin/list-sale/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                            <button onClick={() => trashSale(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                        </div>
                                                    </td>
                                                    <td>{item.percent_sale}</td>
                                                    <td>{item.price_sale}</td>
                                                    <td>{item.status === 2 ? "Ẩn" : "Hiển thị"}</td>
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

export default ListSale;