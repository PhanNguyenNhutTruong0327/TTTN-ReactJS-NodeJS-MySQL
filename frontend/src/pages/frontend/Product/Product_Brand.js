import { Link, useParams } from 'react-router-dom';
import product_img from '../../../assets/frontend/images/product/iphone-15.jpg';
import apiProduct from '../../../api/apiProduct';
import { useEffect, useState } from 'react';
import { imageURL } from '../../../api/config';

function Product_Brand() {
    const numbers = Array.from({ length: 12 }, (_, index) => index + 1);

    const { slug } = useParams();
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
        apiProduct.getProductByBrandSlug(slug, page, limit).then((res) => {
            try {
                const data = res.data.data;

                console.log(data);

                const numberOfPages = res.data.meta.pagination.pageCount;
                setPages(numberOfPages);

                const productData = data.map((item, index) => {
                    return {
                        id: item.id,
                        name: item.attributes.name,
                        slug: item.attributes.slug,
                        price: item.attributes.price,
                        price_sale: item.attributes.price_sale,
                        image: item.attributes.image,
                        brand_id: item.attributes.product_brand,
                        category_id: item.attributes.product_cat,
                        nameCat: item.attributes.nameCat,
                        nameBrand: item.attributes.nameBrand,
                        status: item.attributes.status,
                    }
                }
                )
                setData(productData);


            } catch (e) {
                console.log(e);
            }
        })
    }, [slug, page])


    return (
        <div className='container'>
            <section className="padding-bottom-sm">

                <header className="section-heading heading-line">
                    <h4 className="title-section text-uppercase"></h4>
                </header>

                <div className="row row-sm">
                    {data.map((item, index) => (

                        <div className="col-xl-2 col-lg-3 col-md-4 col-6" key={index} style={{ display: "flex" }}>
                            <div className="card card-sm card-product-grid pt-2" style={{ flexGrow: 1 }}>
                                <span className="badge badge-danger ml-1 mb-2" style={{ width: "40%" }}> Trả góp 0% </span>
                                <Link to={`/san-pham/chi-tiet-san-pham/${item.slug}`} className="img-wrap"> <img src={imageURL + item.image} style={{ objectFit: "contain" }} /> </Link>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title" style={{ fontSize: "14px" }}>{item.name}</a>
                                    <div className="price mt-1 text-danger">{item.price_sale ? formatPrice(item.price_sale) : formatPrice(item.price)}</div>
                                    <div className="price mt-1 text-gray"><del style={{ fontSize: "13px" }}>{item.price_sale ? formatPrice(item.price) : ''}</del></div>
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
                        <Link className="page-link" to={`/thuong-hieu/${slug}/${page - 1}/${limit}`}>Previous</Link>
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
                            to={`/thuong-hieu/${slug}/${index + 1}/${limit}`}
                        >
                            {index + 1}
                        </Link>
                    </li>
                ))}
                <li className="page-item">
                    {page < pages ? (
                        <Link className="page-link" to={`/thuong-hieu/${slug}/${page + 1}/${limit}`}>
                            Next
                        </Link>
                    ) : (
                        <span className="page-link disabled">Next</span>
                    )}

                </li>
            </ul>

        </div>

    );
}

export default Product_Brand;