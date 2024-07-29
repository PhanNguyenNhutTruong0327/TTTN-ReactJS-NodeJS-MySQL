import apiPost from '../../../api/apiPost';
import { useEffect, useState } from 'react';
import { imageURL } from '../../../api/config';
import { Link, useParams } from 'react-router-dom';
import apiTopic from '../../../api/apiTopic';
import Topic_Item from '../../../component/frontend/Topic_Item';
import { format } from 'date-fns';


function News() {


    const [data, setData] = useState([]);
    const [topics, setTopics] = useState([]);
    const [data_post_pro_new, setDataPostProNew] = useState([]);
    const [data_post_sale, setDataPostSale] = useState([]);


    const [data_item, setDataItem] = useState({});
    const [data_item1, setDataItem1] = useState({});
    const [titles, setTitles] = useState([]);

    const page = parseInt(useParams().page);
    const limit = parseInt(useParams().limit);

    const [pages, setPages] = useState(1);


    useEffect(() => {
        apiTopic.getTopicByParentId(0).then((res) => {
            try {
                setTopics(res.data);
            } catch (e) {
                console.log(e);
            }
        })

        apiPost.getPostNew(1, 2).then((res) => {
            setDataItem(res.data[0]);
            setDataItem1(res.data[1]);
            const slug = res.data[1].slug
            apiPost.getDetailPostAndOther(slug).then((result) => {
                setTitles(result.postOther);
            })

        })



        apiPost.getPostBySlugTopic('san-pham-moi', 1, 5).then((res) => {
            try {
                setDataPostProNew(res.data);
            }
            catch (e) {
                console.log(e);
            }
        })

        apiPost.getPostBySlugTopic('khuyen-mai', 1, 5).then((res) => {
            try {
                setDataPostSale(res.data);
            }
            catch (e) {
                console.log(e);
            }
        })
    }, [])

    useEffect(() => {
        apiPost.getPostNew(page, limit).then((res) => {
            setData(res.data);
            const numberOfPages = res.meta.pagination.pageCount;
            setPages(numberOfPages);

        })

    }, [page])
    // const editDate = (string) => {
    //     // Tạo đối tượng Date từ chuỗi thời gian cụ thể
    //     const specificDate = new Date(string);

    //     // Lấy thời gian hiện tại
    //     const currentDate = new Date();

    //     // Tính toán khoảng thời gian (số mili giây)
    //     const timeDiff = currentDate.getTime() - specificDate.getTime();

    //     // Chuyển đổi khoảng thời gian thành số phút và số giờ
    //     const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    //     const hoursDiff = Math.floor(minutesDiff / 60);

    //     // Kiểm tra nếu số giờ vượt quá 24 để chuyển đổi thành ngày
    //     if (hoursDiff >= 24) {

    //         const formattedDateTime = format(new Date(string), "yyyy-MM-dd");

    //         return `${formattedDateTime}`;
    //     } else if (minutesDiff >= 60) { // Kiểm tra nếu số phút vượt quá 60 để chuyển đổi thành giờ
    //         return `Số giờ sau khi được tạo: ${hoursDiff}`;
    //     } else { // Nếu không, trả về số phút
    //         return `Số phút sau khi được tạo: ${minutesDiff}`;
    //     }
    // }

    return (
        <section className="padding-bottom container">
            <div className='m-3'>
                <nav className="navbar1 navbar-main navbar-expand-lg border-bottom">
                    <div className="">
                        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button> */}

                        {topics.length > 0 && (
                            <div className="collapse navbar-collapse justify-content-center" id="main_nav">
                                <ul className="navbar-nav text-center">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={`/tin-tuc/1/5`}>Tất cả</Link>
                                    </li>
                                    {topics.map((menu, index) => {
                                        return (
                                            console.log(menu),

                                            <Topic_Item menu={menu} key={index} />
                                        )
                                    })}


                                </ul>


                            </div>

                        )}
                    </div>
                </nav>


            </div>
            <div className="row">
                <div className="col-md-9 col-sm-6 row" >
                    {Object.keys(data_item).length > 0 ? (
                        <div className='col-md-8 col-sm-12'>
                            <Link to={`/tin-tuc/${data_item.slug}`}>
                                <article className="card card-post" >
                                    <img src={imageURL + data_item.image_1} className="img-fluid img-rounded" alt='img' />
                                    <div className="card-body">
                                        <h5 className="title">{data_item.title}</h5>
                                        <p className="fs-6 text-muted" style={{ margin: "0", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{data_item.description_1}</p>
                                        {/* <span className='text-muted'>{editDate(data_item.created_at)}</span> */}
                                    </div>
                                </article>

                            </Link>

                        </div>

                    ) : (<></>)}
                    {Object.keys(data_item1).length > 0 ? (
                        <div className='col-md-4 col-sm-12'>
                            <article className="card card-post" >
                                <Link to={`/tin-tuc/${data_item1.slug}`}>
                                    <img src={imageURL + data_item1.image_1} className="card-img-top" alt='img' />
                                    <div className="card-body border-bottom">
                                        <h6 className="title">{data_item1.title}</h6>
                                        <p className="small text-uppercase text-muted"></p>
                                    </div>
                                </Link>

                                {titles.length > 0 ? (
                                    titles.map((item, index) => (
                                        <div className="card-body border-bottom" key={index}>
                                            <Link to={`/tin-tuc/${item.slug}`}>
                                                <h6 className="title">{item.title}</h6>
                                                <p className="small text-uppercase text-muted"></p>

                                            </Link>
                                        </div>

                                    ))
                                ) : (<></>)}
                            </article>
                        </div>

                    ) : (<></>)}

                    <div className="col-md col-sm-6" >
                        {data.length > 0 && (
                            <div className='col-md'>
                                {data.map((item, index) => (
                                    <Link to={`/tin-tuc/${item.slug}`}>

                                        <div className="col-md d-none1 d-lg-block flex-grow-1" key={index}>
                                            <aside className="special-home-right" style={{ flex: 1 }}>
                                                <div className="bg-white border-bottom row">
                                                    <div className="col-md-3 col-sm-4 py-2 pl-2">
                                                        <img src={imageURL + item.image_1} height="130px" className="fixed-size-image img-bg ml img-rounded " alt='img' />
                                                    </div>
                                                    <div className="col-md-9 col-sm-6">
                                                        <h6 className="boid-text py-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</h6>
                                                        <p className="text-muted" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description_1}</p>
                                                    </div>
                                                </div>
                                            </aside>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                        )}
                        <br />
                        <ul className="pagination">
                            <li className="page-item">
                                {page > 1 ? (
                                    <Link className="page-link" to={`/tin-tuc/${page - 1}/${limit}`}>Previous</Link>
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
                                        className="page-link "
                                        to={`/tin-tuc/${index + 1}/${limit}`}
                                    >
                                        {index + 1}
                                    </Link>
                                </li>
                            ))}
                            <li className="page-item">
                                {page < pages ? (
                                    <Link className="page-link" to={`/tin-tuc/${page + 1}/${limit}`}>
                                        Next
                                    </Link>
                                ) : (
                                    <span className="page-link disabled">Next</span>

                                )}

                            </li>
                        </ul>

                    </div>

                </div>


                <div className="col-md-3 col-sm-6">
                    {data_post_pro_new.length > 0 && (
                        <div className='col-md'>
                            <h6>Bài viết về sản phẩm mới</h6>
                            {data_post_pro_new.map((item, index) => (
                                <Link to={`/tin-tuc/${item.slug}`}>

                                    <div className="col-md d-none1 d-lg-block flex-grow-1" key={index}>
                                        <aside className="special-home-right" style={{ flex: 1 }}>
                                            <div className="bg-white border-bottom row">
                                                <div className="col-5 py-2 pl-2">
                                                    <img src={imageURL + item.image_1} height="80" width={"100%"} className="fixed-size-image img-bg ml img-rounded " alt='img' />
                                                </div>
                                                <div className="col-6 ml-2">
                                                    <p className="text-muted pb-1" style={{ margin: "0", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</p>
                                                </div>
                                            </div>
                                        </aside>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    )}
                    <br />
                    {data_post_sale.length > 0 && (
                        <div className='col-md'>
                            <h6>Khuyến mãi</h6>
                            {data_post_sale.map((item, index) => (
                                <Link to={`/tin-tuc/${item.slug}`}>

                                    <div className="col-md d-none1 d-lg-block flex-grow-1" key={index}>
                                        <aside className="special-home-right" style={{ flex: 1 }}>
                                            <div className="bg-white border-bottom row">
                                                <div className="py-2 col-5">
                                                    <img src={imageURL + item.image_1} height="80" width={"100%"} className="img-bg img-rounded" alt='img' />
                                                </div>
                                                <div className=" col-6 ml-2">
                                                    <p className="text-muted pb-1" style={{ margin: "0", display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</p>
                                                </div>
                                            </div>
                                        </aside>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}
export default News;