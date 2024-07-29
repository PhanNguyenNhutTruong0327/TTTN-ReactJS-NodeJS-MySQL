import { Link } from 'react-router-dom';
import img_phone from '../../../assets/frontend/images/product/samsung-galaxy-s23-ultra.jpg';
import { useEffect, useState } from "react";
import apiProduct from '../../../api/apiProduct';
import { imageURL } from '../../../api/config';

function Product_Home(props) {

    const tag = props.item;

    const [data, setData] = useState([]);

    const [tag_name, setTagName] = useState('');
    const [short_description, setShortDesciption] = useState('');
    const [slugCat, setSlugCat] = useState('');


	const formatPrice = (price) => {
		const roundedPrice = Math.round(price);
		const formattedPrice = new Intl.NumberFormat('vi-VN').format(roundedPrice);
		return formattedPrice.replace(/,/g, '.') + '.000';
	};

    useEffect(() => {
        console.log(tag)
        apiProduct.getProductByCategory(tag.category_id, tag.tag_id).then((res) => {
            try {
                const data = res.data.data;
                setTagName(res.data.tag);
                setShortDesciption(res.data.short_description);
                setSlugCat(res.data.slugCat);

                const productData = data.map((item, index) => {
                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        brand_id: item.product_brand,
                        category_id: item.product_cat,
                        nameCat: item.nameCat,
                        nameBrand: item.nameBrand,
                        status: item.status,
                        slug: item.slug
                    }
                }
                )
                setData(productData);

            } catch (e) {
                console.log(e);
            }
        })
    }, [])

    if (data.length > 0) {
        return (
            <section className="padding-bottom">
                <header className="section-heading heading-line">
                    <h4 className="title-section text-uppercase">{tag_name}</h4>
                </header>

                <div className="card card-home-category">
                    <div className="row no-gutters">
                        <div className="col-md-3">

                            <div className="home-category-banner bg-light-orange">
                                <h5 className="title">{short_description}</h5>
                                <Link to={`/danh-muc/${slugCat}/1/10`} className="btn btn-outline-primary rounded-pill">Xem thêm</Link>
                                <img src={img_phone} className="img-bg" />
                            </div>

                        </div>
                        <div className="col-md-9">
                            <ul className="row no-gutters bordered-cols">
                                {data.map((item, index) => {
                                    return (
                                        <li className="col-6 col-lg-3 col-md-4" key={index}>
                                            <Link to={`/san-pham/chi-tiet-san-pham/${item.slug}`} className="item">
                                                <span className="badge badge-danger mt-1 ml-1" style={{ fontSize: "11px" }}> Trả góp 0% </span>
                                                <div className="card-body text-center">
                                                    <img className="img-md " src={imageURL + item.image} style={{ height: "140px", width: "auto" }} />
                                                    <br /><br />
                                                    <p>{item.name}</p>
                                                    <h6 className="text-danger">{formatPrice(item.price)}</h6>
                                                    {/* <p className="text-muted"><del>14.550.000đ</del></p> */}
                                                </div>
                                                <div className="rating-wrap ml-3 my-3">
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
                                                    <small className="label-rating text-muted">132</small>
                                                    <br />
                                                    <small className="label-rating text-success"> <i className="fa fa-clipboard-check"></i> 154 orders </small>
                                                </div>
                                            </Link>
                                        </li>

                                    )
                                })}
                                {/* <li className="col-6 col-lg-3 col-md-4">
                                <a href="#" className="item">
                                    <span className="badge badge-danger mt-1 ml-1" style={{ fontSize: "11px" }}> Trả góp 0% </span>
                                    <div className="card-body text-center">
                                        <img className="img-md " src={product_1} style={{ height: "140px", width: "140px" }} />                                        <br /><br />
                                        <p>iPhone 13 128GB</p>
                                        <h6>13.500.000đ</h6>
                                        <p className="text-muted"><del>14.550.000đ</del></p>
                                    </div>
                                </a>
                            </li>
                            <li className="col-6 col-lg-3 col-md-4">
                                <a href="#" className="item">
                                    <span className="badge badge-danger mt-1 ml-1" style={{ fontSize: "11px" }}> Trả góp 0% </span>
                                    <div className="card-body text-center">
                                        <img className="img-md " src={product_1} style={{ height: "140px", width: "140px" }} />                                        <br /><br />
                                        <p>iPhone 13 128GB</p>
                                        <h6>13.500.000đ</h6>
                                        <p className="text-muted"><del>14.550.000đ</del></p>
                                    </div>
                                </a>
                            </li>
                            <li className="col-6 col-lg-3 col-md-4">
                                <a href="#" className="item">
                                    <span className="badge badge-danger mt-1 ml-1" style={{ fontSize: "11px" }}> Trả góp 0% </span>
                                    <div className="card-body text-center">
                                        <img className="img-md " src={product_1} style={{ height: "140px", width: "140px" }} />                                        <br /><br />
                                        <p>iPhone 13 128GB</p>
                                        <h6>13.500.000đ</h6>
                                        <p className="text-muted"><del>14.550.000đ</del></p>
                                    </div>
                                </a>
                            </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

        );
    }
}
export default Product_Home;