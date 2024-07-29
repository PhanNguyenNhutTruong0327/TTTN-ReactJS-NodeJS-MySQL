import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import { imageURL } from "../../../api/config";

function ListProductTrash() {

    const [products, setProducts] = useState([]);

    const page = parseInt(useParams().page);
    const limit = parseInt(useParams().limit);

    const [pages, setPages] = useState(1);

    const [qty_data, setQtyData] = useState(0);

    const [tamp, setTamp] = useState();

	const formatPrice = (price) => {
		const roundedPrice = Math.round(price);
		const formattedPrice = new Intl.NumberFormat('vi-VN').format(roundedPrice);
		return formattedPrice.replace(/,/g, '.') + '.000';
	};


    useEffect(() => {
        apiProduct.getListTrash(page, limit).then((res) => {
            try {
                const data = res.data;
                console.log(data);

                const numberOfPages = res.meta.pagination.pageCount;
                setPages(numberOfPages);
                const productData = res.data.map((item, index) => {
                    return {
                        id: item.id,
                        name: item.product_name,
                        price: item.price,
                        image: item.image,
                        brand_id: item.product_brand,
                        category_id: item.product_cat,
                        nameCat: item.nameCat,
                        nameBrand: item.nameBrand,
                        status: item.status,
                    }
                }
                )
                setProducts(productData);
                setQtyData(res.meta.pagination.total);


            } catch (e) {
                console.log(e);
            }
            setTamp();
        })
    }, [tamp, page])




    function rescoverTrash(id) {
        apiProduct.rescoverTrash(id).then(function (result) {
            alert(result.data.message);
            setTamp(id)

        })
    }

    function deleteProduct(id) {
        apiProduct.deleteProduct(id).then(function (result) {
            if(result.data.success === 'true'){
                alert(result.data.message);
                setTamp(id)    
            }
            else{
                alert('Xóa sản phẩm không thành công !. Hãy thử lại sau.')
            }

        })
    }
    if (products.length > 0) {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-10">
                                <h1 className="d-inline">Thùng rác <sup>({qty_data})</sup></h1>
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
                                <div className="col-md">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="text-center" style={{ width: "30px" }}>
                                                    <input type="checkbox" />
                                                </th>
                                                <th>Id</th>
                                                <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                                <th>Tên sản phẩm</th>
                                                {/* <th>Tên slug</th> */}
                                                <th>Giá</th>
                                                <th>Danh mục</th>
                                                <th>Thương hiệu</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item, index) => {
                                                return (
                                                    <tr className="datarow" key={index}>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                        <td>{item.id}</td>
                                                        <td>
                                                            <img src={imageURL + item.image} alt="product.jpg" style={{ width: "100%" }} />
                                                        </td>
                                                        <td style={{ width: "30%" }}>
                                                            <div className="name">
                                                                {item.name}
                                                            </div>
                                                            <div className="function_style">
                                                                <Link to={`/admin/list-products/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                                <button onClick={() => rescoverTrash(item.id)} className="btn btn-sm"><i className="fa fa-history me-1" aria-hidden="true"></i>Phục hồi</button> |
                                                                <button onClick={() => deleteProduct(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                            </div>
                                                        </td>
                                                        {/* <td>{item.slug}</td> */}
                                                        <td>{formatPrice(item.price)}</td>
                                                        <td>{item.nameCat}</td>
                                                        <td>{item.nameBrand}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <ul className="pagination">
                                    <li className="page-item">
                                        {page > 1 ? (
                                            <Link className="page-link" to={`/admin/list-products/${page - 1}/${limit}`}>Previous</Link>
                                        ) : (
                                            <span className="page-link disabled">Previous</span>
                                        )}
                                    </li>
                                    {Array.from(Array(pages).keys()).map((index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${index + 1 === page ? "active" : ""}`}
                                        >
                                            <Link
                                                className="page-link bg-white"
                                                to={`/admin/list-products/${index + 1}/${limit}`}
                                            >
                                                {index + 1}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <Link className="page-link" to={`/admin/list-products/${page + 1}/${limit}`}>
                                            Next
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );

    }
    else {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-10">
                                <h1 className="d-inline">Tất cả sản phẩm <sup>({qty_data})</sup></h1>
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
                                <div className="col-md">
                                    <div className="col-md-12 text-center">
                                        <p>Hiện tại không có rác !</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>

        );

    }
}

export default ListProductTrash;