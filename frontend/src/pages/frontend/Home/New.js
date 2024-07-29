import { useEffect, useState } from "react";
import apiPost from "../../../api/apiPost";
import { imageURL } from "../../../api/config";
import { Link } from "react-router-dom";

function New() {

    const [data, setData] = useState([]);

    useEffect(() => {
        apiPost.getPostNew(1, 3).then((res) => {
            try {
                setData(res.data);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])

    return (
        <div className="col-md d-none d-lg-block flex-grow-1">
            <aside className="special-home-right">
                <h6 className="bg-blue text-center text-white mb-0 p-2"><Link to={`/tin-tuc/1/5`}>24h Công Nghệ</Link></h6>
                {data.map((item, index) => {
                    return (
                        <Link to={`/tin-tuc/${item.slug}`}>
                            <div className="bg-white border-bottom d-flex pt-2" style={{ height: "113px" }}>
                                <div className="py-2 align-items-center" style={{ width: "50%" }}>
                                    <img src={imageURL + item.image_1} height="70" width="80" className="img-bg ml-3 " />
                                </div>
                                <div className="ml-2">
                                    <p className="text-muted pb-1" style={{ margin: "0", display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</p>
                                    <Link to={`/tin-tuc/${item.slug}`} className="btn btn-secondary btn-sm mb-1">Xem thêm</Link>
                                </div>
                            </div>
                        </Link>
                    );
                })}



            </aside>
        </div>

    );
}
export default New;