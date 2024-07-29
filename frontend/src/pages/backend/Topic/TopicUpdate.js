import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import apiTopic from "../../../api/apiTopic";

function TopicUpdate() {
    const { id } = useParams();

    const navigate = useNavigate(); // chuyen trang

    const [topics, setTopics] = useState([]);

    const [name, setName] = useState('');
    const [parent_id, setParentId] = useState(0);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(2);



    useEffect(() => {

        apiTopic.getTopicById(id).then((res) => {
            try {
                setName(res.data.name);
                setParentId(res.data.parent_id);
                setDescription(res.data.description);
                setStatus(res.data.status);
            } catch (e) {
                console.log(e);
            }
        })

        apiTopic.getAll().then((res) => {
            try {
                const data = res.data;
                const topicData = data.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                    }
                });
                setTopics(topicData);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])

    const handleSubmit = async (e) => {
        if (name !== '' && description !== '') {
            e.preventDefault();
            const topic = {
                name: name,
                parent_id: parent_id,
                description: description,
                status: status
            };

            await apiTopic.updateTopic(topic, id).then((res) => {
                if (res.data !== null) {
                    alert("Cập nhật dữ liệu thành công !")
                    navigate('/admin/list-topic', { replace: true });
                }
                else {
                    alert("Không thành công !")
                }
            })
        }
        else {
            e.preventDefault();
            alert('Vui lòng nhập đầu đủ thông tin !')
        }
    }


    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-12">
                            <h1 className="d-inline">Chỉnh sửa chủ đề</h1>
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

                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <form onSubmit={handleSubmit} >

                                    <div className="mb-3">
                                        <label>Tên chủ đề (*)</label>
                                        <input type="text" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Mô tả (*)</label>
                                        <textarea type="areatext" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    {/* <div className="mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" id="slug" placeholder="Nhập slug" className="form-control" />
                                </div> */}
                                    <div className="mb-3">
                                        <label>Danh mục cha (*)</label>
                                        <select name="parent_id" className="form-control" onChange={(e) => setParentId(e.target.value)} value={parent_id}>
                                            <option value="0">None</option>
                                            {topics.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={index}>{item.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    {/* <div className="mb-3">
                                        <label>Sắp xếp (*)</label>
                                        <select name="sort_order" className="form-control" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} >
                                            <option value="0">None</option>
                                            {categories.map((item, index) => {
                                                return (
                                                    <option value={item.sort_order + 1} key={index}>Sau: {item.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div> */}
                                    {/* <div className="mb-3">
                                    <label>Hình đại diện</label>
                                    <input type="file" name="image" className="form-control" />
                                </div> */}
                                    <div className="mb-3">
                                        <label>Trạng thái</label>
                                        <select name="status" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="1">Xuất bản</option>
                                            <option value="2">Chưa xuất bản</option>
                                        </select>
                                    </div>
                                    <div className="card-header text-right">
                                        <button className="btn btn- btn-success">
                                            <i className="fa fa-save me-2" aria-hidden="true"></i>
                                            Lưu
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default TopicUpdate;