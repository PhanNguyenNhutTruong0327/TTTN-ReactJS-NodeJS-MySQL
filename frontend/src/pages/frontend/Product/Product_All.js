import { useEffect, useState } from 'react';
import apiProduct from '../../../api/apiProduct';
import {Link, useParams } from 'react-router-dom';
import { imageURL } from '../../../api/config';

function Product_All() {

    const [data, setData] = useState([]);

    const page = parseInt(useParams().page);
    const limit = parseInt(useParams().limit);

    const [pages, setPages] = useState(1);

    const formatPrice = (price) => {
        const roundedPrice = Math.round(price);
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(roundedPrice);
        return formattedPrice.replace(/,/g, '.') + '.000';
    };


    useEffect(() => {
        apiProduct.getAllProductPaginationFE(page, limit).then((res) => {
            try {
                const numberOfPages = res.meta.pagination.pageCount;
                setPages(numberOfPages);

                setData(res.data);
            } catch (e) {
                console.log(e);
            }
        })
    }, [page])



    return (
        <div className='container'>
            <section className="padding-bottom-sm">

                <header className="section-heading heading-line">
                    <h4 className="title-section text-uppercase">Tất cả sản phẩm</h4>
                </header>

                <div className="row row-sm">
                    {data.map((item, index) => (

                        <div className="col-xl-2 col-lg-3 col-md-4 col-6" key={index} style={{ display: "flex" }}>
                            <div className="card card-sm card-product-grid pt-2" style={{ flexGrow: 1 }}>
                                <span className="badge badge-danger ml-1 mb-2" style={{ width: "40%" }}> Trả góp 0% </span>
                                <Link to={`/san-pham/chi-tiet-san-pham/${item.attributes.slug}`} className="img-wrap"> <img src={imageURL + item.attributes.image} style={{ height: "140px", width: "auto" }}/></Link>
                                <figcaption className="info-wrap">
                                    <Link to={`/san-pham/chi-tiet-san-pham/${item.attributes.slug}`} className="title" style={{ fontSize: "14px" }}>{item.attributes.name}</Link>
                                    <div className="price mt-1 text-danger">{item.attributes.price_sale ? formatPrice(item.attributes.price_sale) : formatPrice(item.attributes.price)}</div>
                                    <div className="price mt-1 text-gray"><del className="12px">{item.attributes.price_sale ? formatPrice(item.attributes.price) : ''}</del></div>
                                    <p style={{ fontSize: "12px" }}>Quà 900.000đ</p>
                                    <div className="rating-wrap mt-2">
                                        <ul className="rating-stars">
                                            <li style={{ width: "80%" }} className="stars-active">
                                                <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </li>
                                            <li>
                                                <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </li>
                                        </ul>
                                        <small className="label-rating text-muted">(132)</small>
                                    </div>

                                </figcaption>

                            </div>
                        </div>


                    ))}
                </div>
            </section>
            <ul className="pagination">
                <li className="page-item">
                    {page > 1 ? (
                        <Link className="page-link" to={`/san-pham/${page - 1}/${limit}`}>Previous</Link>
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
                            to={`/san-pham/${index + 1}/${limit}`}
                        >
                            {index + 1}
                        </Link>
                    </li>
                ))}
                <li className="page-item">
                    <Link className="page-link" to={`/san-pham/${page + 1}/${limit}`}>
                        Next
                    </Link>
                </li>
            </ul>

        </div>

    );
}

export default Product_All;