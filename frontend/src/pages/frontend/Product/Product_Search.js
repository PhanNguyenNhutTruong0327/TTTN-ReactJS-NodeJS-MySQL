import { useEffect, useState } from "react";
import { imageURL } from "../../../api/config";
import { Link, useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";

function Product_Search() {

    const { key } = useParams();

    const [products, setProducts] = useState([]);

    const formatPrice = (price) => {
        const roundedPrice = Math.round(price);
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(roundedPrice);
        return formattedPrice.replace(/,/g, '.') + '.000';
    };
    const page = parseInt(useParams().page);
    const limit = parseInt(useParams().limit);

    const [pages, setPages] = useState(1);


    useEffect(() => {
        apiProduct.searchProducts(key, page, limit).then((res) => {
            try {
                const data = res.data;

                console.log(res);

                const numberOfPages = res.meta.pagination.pageCount;
                setPages(numberOfPages);

                const productData = data.map((item, index) => {
                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        price_sale: item.price_sale,
                        image: item.image,
                        brand_id: item.product_brand,
                        category_id: item.product_cat,
                        nameCat: item.nameCat,
                        nameBrand: item.nameBrand,
                        status: item.status,
                        slug: item.slug,
                    }
                }
                )
                setProducts(productData);


            } catch (e) {
                console.log(e);
            }
        })
    }, [key, page])

    return (
        <section className="padding-bottom-sm container">
            <header className="section-heading heading-line">
                <h4 className="title-section text-uppercase">GỢI Ý HÔM NAY</h4>
            </header>

            <div className="row row-sm">
                {products.map((item, index) => (

                    <div className="col-xl-2 col-lg-3 col-md-4 col-6" key={index} style={{ display: "flex" }}>
                        <div className="card card-sm card-product-grid pt-2" style={{ flexGrow: 1 }}>
                            <span className="badge badge-danger ml-1 mb-2" style={{ width: "40%" }}> Trả góp 0% </span>
                            <a href="#" className="img-wrap"> <img src={imageURL + item.image} style={{ height: "140px", width: "auto" }} /> </a>
                            <figcaption className="info-wrap">
                                <a href="#" className="title" style={{ fontSize: "14px" }}>{item.name}</a>
                                <div className="price mt-1 text-danger">{item.price_sale ? formatPrice(item.price_sale) : formatPrice(item.price)}</div>
                                <div className="price mt-1 text-gray"><del className="12px">{item.price_sale ? formatPrice(item.price) : ''}</del></div>
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
            <ul className="pagination">
                <li className="page-item">
                    {page > 1 ? (
                        <Link className="page-link" to={`/tim-kiem/${key}/${page - 1}/${limit}`}>Previous</Link>
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
                            to={`/tim-kiem/${key}/${index + 1}/${limit}`}
                        >
                            {index + 1}
                        </Link>
                    </li>
                ))}
                <li className="page-item">
                    {page < pages ? (
                        <Link className="page-link" to={`/tim-kiem/${key}/${page + 1}/${limit}`}>
                            Next
                        </Link>
                    ) : (
                        <span className="page-link disabled">Next</span>
                    )}

                </li>
            </ul>

        </section>

    );
}

export default Product_Search;