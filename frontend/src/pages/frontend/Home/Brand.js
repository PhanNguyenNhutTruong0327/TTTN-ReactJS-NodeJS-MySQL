import { useEffect } from "react";
import { useState } from "react";
import apiBrand from "../../../api/apiBrand";
import { Link } from "react-router-dom";
import icon from "../../../assets/frontend/images/icons/icon-iphone.png"
import { imageURL } from "../../../api/config";

function Brand() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        apiBrand.getBrandFE().then((res) => {
            try {
                console.log(res);
                const brandData = res.map((item,index) => {
                    return {
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        icon: item.icon,
                        icon: item.icon,
                        description: item.description
                    }
                });
                setBrands(brandData);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])


    return (
        <aside className="col-lg col-md-3 flex-lg-grow-0">
            <nav className="nav-home-aside">
                <h6 className="title-category">THƯƠNG HIỆU <i className="d-md-none icon fa fa-chevron-down"></i>
                </h6>
                <ul className="menu-category pt-3">
                    {brands.map((item, index) => {
                        return (
                            <li className="d-flex" key={index}>
                                <img className="pt-2" src={imageURL + item.icon} alt="icon" style={{width:"40%", height:"40%"}}/>
                                <Link to={`/thuong-hieu/${item.slug}/1/10`}  className="ps-3">{item.name}</Link>
                            </li>

                        );
                    })}

                    {/* <li><a href="#">Thương hiệu 1</a></li>
                    <li><a href="#">Thương hiệu 1</a></li>
                    <li><a href="#">Thương hiệu 1</a></li>
                    <li><a href="#">Thương hiệu 1</a></li>
                    <li><a href="#">Thương hiệu 1</a></li>
                    <li><a href="#">Thương hiệu 1</a></li>
                    <li><a href="#">Thương hiệu 1</a></li>
                    <li><a href="#">Thương hiệu 1</a></li> */}
                    {/* <li className="has-submenu"><a href="#">More items</a>
                            <ul className="submenu">
                                <li><a href="#">Submenu name</a></li>
                                <li><a href="#">Great submenu</a></li>
                                <li><a href="#">Another menu</a></li>
                                <li><a href="#">Some others</a></li>
                            </ul>
                        </li> */}
                </ul>
            </nav>
        </aside>
    );
}
export default Brand;