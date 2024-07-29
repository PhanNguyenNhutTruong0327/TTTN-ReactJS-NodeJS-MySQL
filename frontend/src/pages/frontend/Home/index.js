import { useEffect, useState } from "react";
import apiTag from "../../../api/apiTag";
import Brand from "./Brand";
import List_New from "./List_New";
import New from "./New";
import Product_Home from "./Product_Home";
import Sale from "./Sale";
import Slider from "./Slider";
import Suggested_Products from "./Suggested_Products";
import { useAuth } from "../../../component/Provider/AuthProvider";
import ProductBestSeller from "./ProductBestSeller";
// import banner_1 from '../../assets/frontend/images/banners/banner_1.png';

function Home() {
    const { token } = useAuth();

    const [tag, setTag] = useState([]);

    useEffect(() => {
        apiTag.getTagCatgory().then((res) => {
            try {
                setTag(res.data);

            } catch (e) {
                console.log(e);
            }
        })
    }, [])

    return (
        <div className="container">
            {console.log(token)}
            <section className="section-main padding-y">
                <main className="card">
                    <div className="card-body">
                        <div className="row">
                            <Brand />
                            <Slider />
                            <New />
                        </div>
                    </div>
                    {/* <img src={banner_1} alt="banner" className="img-fluid" /> */}
                </main>
            </section>
            <Sale />
            {tag.map((item, index) => {
                return (
                    <Product_Home item={item} key={index} />
                )
            })}
            <ProductBestSeller />
            <Suggested_Products />
            <List_New />
        </div>
    );
}

export default Home;