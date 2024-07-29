import apiDiscountedPro from "../../../api/apiDiscountedPro";
import { imageURL } from "../../../api/config";
import img_sale from "../../../assets/frontend/images/product/iphone-13.jpg"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sale() {
	const [data, setData] = useState([]);

	const formatPrice = (price) => {
		const roundedPrice = Math.round(price);
		const formattedPrice = new Intl.NumberFormat('vi-VN').format(roundedPrice);
		return formattedPrice.replace(/,/g, '.') + '.000';
	};

	useEffect(() => {
		apiDiscountedPro.getDiscountProWithLimit(5).then((res) => {
			try {
				const data = res.data.data;

				setData(data);

			} catch (e) {
				console.log(e);
			}
		})
	}, [])

	if (data.length > 0) {
		return (
			<section className="padding-bottom">
				<div className="card card-deal ">
					<div className="col-heading content-body" style={{backgroundColor:"#ffb3b3"}}>
						<header className="section-heading">
							<h3 className="section-title">GIÁ SỐC SINH NHẬT</h3>
							<p>Thời gian còn lại</p>
						</header>
						<div className="timer">
							<div> <span className="num">04</span> <small>Ngày</small></div>
							<div> <span className="num">12</span> <small>Giờ</small></div>
							<div> <span className="num">58</span> <small>Phút</small></div>
							<div> <span className="num">02</span> <small>Giây</small></div>
						</div>
					</div>
					<div className="row no-gutters items-wrap ">
						{data.map((item, index) => {
							return (
								<div className="col-md col-6" key={index} style={{ display: "flex" }}>
									<figure className="card-product-grid card-sm pt-3" style={{ flexGrow: 1 }}>
										<Link to={`/san-pham/chi-tiet-san-pham/${item.slug}`} className="img-wrap">
											<img src={imageURL + item.image} style={{maxHeight:"140px", width:"auto"}}/>
										</Link>
										<div className="text-wrap pb-3">
											<a href="#" className="title p-1" >{item.name_pro}</a>
											<span style={{ color: "red" }}>{formatPrice(item.price_sale)}<sup>đ</sup></span><br />
											<span style={{ color: "gray" }}><del>{formatPrice(item.price)}<sup>đ</sup></del></span>
											<br />
											<span className="badge badge-danger"> {item.percent_sale} </span>
										</div>
									</figure>
								</div>

							)
						})}
						{/* <div className="col-md col-6">
							<figure className="card-product-grid card-sm">
								<a href="#" className="img-wrap">
									<img src="images/items/6.jpg" />
								</a>
								<div className="text-wrap p-3">
									<a href="#" className="title">Home apparel</a>
									<span className="badge badge-danger"> -15% </span>
								</div>
							</figure>
						</div> */}
						{/* <div className="col-md col-6">
							<figure className="card-product-grid card-sm">
								<a href="#" className="img-wrap">
									<img src="images/items/7.jpg" />
								</a>
								<div className="text-wrap p-3">
									<a href="#" className="title text-truncate">Smart watches</a>
									<span className="badge badge-danger"> -10% </span>
								</div>
							</figure>
						</div> */}
					</div>
				</div>

			</section>
		);

	}
}
export default Sale;