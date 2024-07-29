import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import apiTopic from "../../../api/apiTopic";

function TopicShow() {

    const {id} = useParams();
    const [topic, setTopic] = useState([]);
    const [status, setStatus] = useState('Ẩn');

    useEffect(() => {
        apiTopic.getTopicById(id).then((res) => {
            try {
                setTopic(res.data);
                if(res.data.status === 1){
                    setStatus('Hiển thị');
                }
            } catch (e) {
                console.log(e);
            }
        })
    }, [])

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Chi tiết chủ đề</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <div className="card">
                    <div className="card-header text-right">
                        <Link to="/admin/list-topic" className="btn btn-sm btn-info">
                            <i className="fa fa-reply me-1" aria-hidden="true"></i>
                            Quay lại
                        </Link>
                    </div>
                    <div className="card-body p-2">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: "30%" }}>Tên trường</th>
                                    <th>Giá trị</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{topic.id}</td>
                                </tr>
                                <tr>
                                    <th>Tiêu đề</th>
                                    <td>{topic.name}</td>
                                </tr>
                                <tr>
                                    <th>Slug</th>
                                    <td>{topic.slug}</td>
                                </tr>
                                <tr>
                                    <th>Mô tả</th>
                                    <td>{topic.description}</td>
                                </tr>
                                <tr>
                                    <th>Danh mục cha</th>
                                    <td>{topic.parent_name}</td>
                                </tr>
                                <tr>
                                    <th>Trạng thái</th>
                                    <td>{status}</td>
                                </tr>
                                <tr>
                                    <th>Ngày thêm</th>
                                    <td>{topic.created_at}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default TopicShow;