import img_pro_1 from "../../../assets/frontend/images/product/iphone-13.jpg";
import { Link, useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import { useEffect, useState } from "react";
import { imageURL } from "../../../api/config";
import { useCart } from "react-use-cart";
import { useAuth } from "../../../component/Provider/AuthProvider";


function Product_Detail() {

    const { slug } = useParams();

    const { token } = useAuth();

    const { addItem } = useCart();

    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        if (quantity < 5) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const [product, setProduct] = useState([]);
    const [productOther, setProductOther] = useState([]);
    const [related_accessories, setRelatedAccessories] = useState([]);

    const formatPrice = (price) => {
        const roundedPrice = Math.round(price);
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(roundedPrice);
        return formattedPrice.replace(/,/g, '.') + '.000đ';
    };


    useEffect(() => {
        apiProduct.getDetailAndProductOther(slug).then((res) => {
            try {
                setProduct(res.data.data);
                setProductOther(res.data.productOther);
                setRelatedAccessories(res.data.related_accessories);
            } catch (e) {
                console.log(e);
            }
        })
    }, [slug])


    const addToCart = (user_id, product) => {
        if (user_id !== null) {
            product.user_id = user_id;
            product.quantity = quantity;
            console.log(product);
            addItem(product);
            alert('Đã thêm vào giỏ hàng !')
        }
        else {
            alert('Hãy đăng nhập để mua hàng !')
        }
    }

    return (
        <>
            <section className="section-content bg-white padding-y">
                <div className="container">
                    {console.log(product)}
                    <div className="row">
                        <aside className="col-md-8">
                            <div className="card">
                                <article className="gallery-wrap">
                                    <div className="img-big-wrap">
                                        <div> <a href="#"><img src={imageURL + product.image} className="pt-3" style={{ height: "40%", width: "30%" }} /></a></div>
                                    </div>
                                    {/* <div className="thumbs-wrap">
                                        {image_related.map((image, index) => {
                                            return (
                                                <a key={index} href="#" className="item-thumb"> <img src={imageURL + image.image} className="p-1" style={{}} /></a>
                                            )
                                        })}
                                    </div> */}
                                </article>
                            </div>

                            <h5 className="title-description">Thông tin sản phẩm</h5>
                            <p>{product.detail_1}</p>
                            {product.image_detail && (
                                <div className="img-fuild text-center">
                                    <img src={imageURL + product.image_detail} alt="img detail" className="img-fuild" style={{ height: "60%", width: "60%" }} />
                                </div>
                            )}
                            {/* <ul className="list-check">
                                <li>Material: Stainless steel</li>
                                <li>Weight: 82kg</li>
                                <li>built-in drip tray</li>
                                <li>Open base for pots and pans</li>
                                <li>On request available in propane execution</li>
                            </ul> */}
                            <br />
                            <p>{product.detail_2}</p>



                        </aside>
                        <main className="col-md-4">
                            <article className="product-info-aside">

                                <h2 className="title mt-3 ml-3">{product.name} </h2>

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
                                    <small className="label-rating text-muted">132 reviews</small>
                                    <small className="label-rating text-success"> <i className="fa fa-clipboard-check"></i> 154 orders </small>
                                </div>

                                <div className="mb-3 ml-3">
                                    <var className="price h4">{formatPrice(product.price)}</var>
                                    <br />
                                    <del className="price h6" style={{ color: "gray" }}>{product.price_initial ? formatPrice(product.price_initial) : ''}</del>
                                    {/* <span className="text-muted">USD 562.65 incl. VAT</span> */}
                                </div>

                                <dl className="row">
                                    <dt className="col-sm-4">Thương hiệu</dt>
                                    <dd className="col-sm-8"><a href="#">{product.nameBrand}</a></dd>

                                    <dt className="col-sm-12">Sinh nhật giá sốc</dt>
                                    {/* <dd className="col-sm-9">596 065</dd> */}
                                    {/* <dt className="col-sm-3">Guarantee</dt> */}

                                    <ul className="list-check ml-3" style={{ fontSize: "13px" }}>
                                        <li>Apple Watch mua kèm giảm thêm 300,000đ đến 3,000,000đ (Tùy Model) khi mua kèm Iphone/iPad/Macbook</li>
                                        <li>Mua 1 số iPad giảm đến 20% (Không kèm khuyến mãi khác của iPad) </li>
                                    </ul>
                                </dl>

                                <div className="form-row  mt-4">
                                    <div className="form-group col-md-4 flex-grow-0">
                                        <div className="input-group mb-3 input-spinner">
                                            <div className="input-group-prepend">
                                                <button className="btn btn-light" type="button" id="button-minus" onClick={handleDecrement}> &minus; </button>

                                            </div>
                                            <input type="text" className="form-control text-center" value={quantity} readOnly style={{ height: "38px" }} />
                                            <div className="input-group-append">
                                                <button className="btn btn-light" type="button" id="button-plus" onClick={handleIncrement}> + </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-md">
                                        <button className="btn  btn-primary" onClick={() => addToCart(token, product)}>
                                            <i className="fas fa-shopping-cart"></i> <span className="text">Mua ngay</span>
                                        </button>
                                        {/* <a href="#" className="btn btn-light">
                                            <i className="fas fa-envelope"></i> <span className="text">Contact supplier</span>
                                        </a> */}
                                    </div>
                                    {product.chip && (<div className="col-12">
                                        <hr></hr>
                                        <h6>Cấu hình {product.name}</h6>
                                        <table className="table table-striped" style={{ fontSize: "13px" }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: "150px" }}>Màn hình:</td>
                                                    <td>{product.screen}</td>
                                                </tr>
                                                <tr>
                                                    <td>Hệ điều hành:</td>
                                                    <td>{product.operating_system}</td>
                                                </tr>
                                                <tr>
                                                    <td>Camera sau:</td>
                                                    <td>{product.rear_camera}</td>
                                                </tr>
                                                <tr>
                                                    <td>Camera trước:</td>
                                                    <td>{product.front_camera}</td>
                                                </tr>
                                                <tr>
                                                    <td>Chip:</td>
                                                    <td>{product.chip}</td>
                                                </tr><tr>
                                                    <td>Ram:</td>
                                                    <td>{product.ram}</td>
                                                </tr>
                                                <tr>
                                                    <td>Dung lượng lưu trữ:</td>
                                                    <td>{product.rom}</td>
                                                </tr>
                                                <tr>
                                                    <td>Kết nối:</td>
                                                    <td>{product.connect}</td>
                                                </tr>
                                                <tr>
                                                    <td>Pin, Sạc:</td>
                                                    <td>{product.pin}</td>
                                                </tr>
                                                <tr>
                                                    <td>Kích thước:</td>
                                                    <td>{product.size}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    )}

                                    {/* <div className="box">

                                        <h5 className="title-description mb-4" style={{ fontSize: "16px" }}>Tin tức về sản phẩm</h5>

                                        <article className="media mb-3">
                                            <a href="#"><img className="img-sm mr-3" src="images/posts/3.jpg" /></a>
                                            <div className="media-body">
                                                <h6 className="mt-0"><a href="#">How to use this item</a></h6>
                                                <p className="mb-2"> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                                    sollicitudin </p>
                                            </div>
                                        </article>

                                        <article className="media mb-3">
                                            <a href="#"><img className="img-sm mr-3" src="images/posts/2.jpg" /></a>
                                            <div className="media-body">
                                                <h6 className="mt-0"><a href="#">New tips and tricks</a></h6>
                                                <p className="mb-2"> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                                    sollicitudin </p>
                                            </div>
                                        </article>

                                        <article className="media mb-3">
                                            <a href="#"><img className="img-sm mr-3" src="images/posts/1.jpg" /></a>
                                            <div className="media-body">
                                                <h6 className="mt-0"><a href="#">New tips and tricks</a></h6>
                                                <p className="mb-2"> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                                    sollicitudin </p>
                                            </div>
                                        </article>
                                    </div> */}
                                </div>
                            </article>
                        </main>
                    </div>
                </div>
            </section>
            {related_accessories.length > 0 ? (
                <section className="padding-bottom-sm container ">

                    <header className="section-heading heading-line">
                        <h4 className="title-section text-uppercase">Phụ kiện mua cùng</h4>
                    </header>

                    <div className="row row-sm container  flex-nowrap overflow-auto">
                        {related_accessories.map((item, index) => (
                            <div className="col-xl-2 col-lg-3 col-md-4 col-6" style={{ display: "flex" }} key={index}>
                                <div className="card card-sm card-product-grid pt-2" style={{ flexGrow: 1 }}>
                                    <span className="badge badge-danger ml-1 mb-2" style={{ width: "40%" }}> Trả góp 0% </span>
                                    <Link to={`/san-pham/chi-tiet-san-pham/${item.slug}`} className="img-wrap"> <img src={imageURL + item.image} alt="anh sp" /> </Link>
                                    <figcaption className="info-wrap">
                                        <Link href="#" to={`/san-pham/chi-tiet-san-pham/${item.slug}`} className="title" style={{ fontSize: "14px" }}>{item.name}</Link>
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
                </section>

            ) : (<></>)}


            <section className="padding-bottom-sm container">

                <div className='row'>
                    <header className="section-heading heading-line col-md-11">
                        <h4 className="title-section text-uppercase">Sản phẩm tương tự</h4>
                    </header>
                    <Link to={`/danh-muc/${product.slugCat}/1/10`} className="section-heading col-md-1 title-section text-success">Xem Thêm</Link>

                </div>
                <div className="row row-sm container">
                    {productOther.map((item, index) => {
                        return (
                            <div className="col-xl-2 col-lg-3 col-md-4 col-6" key={index} style={{ display: "flex" }}>
                                <div className="card card-sm card-product-grid pt-2" style={{ flexGrow: 1 }}>
                                    <Link to={`/san-pham/chi-tiet-san-pham/${item.slug}`}>
                                        <span className="badge badge-danger ml-1 mb-2" style={{ width: "40%" }}> Trả góp 0% </span>
                                        <a href="#" className="img-wrap"> <img src={imageURL + item.image} alt="san pham" style={{ objectFit: "contain" }} /> </a>
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
                                    </Link>
                                </div>
                            </div>

                        )
                    })}



                </div>
            </section>


        </>
    );
}
export default Product_Detail;