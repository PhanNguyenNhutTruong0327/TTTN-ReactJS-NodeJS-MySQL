import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiTopic from "../../../api/apiTopic";

function ListTopic() {

    const [topics, setTopics] = useState([]);
    const [name, setName] = useState('');
    const [parent_id, setParentId] = useState(0);
    const [description, setDescrition] = useState('');
    const [status, setStatus] = useState(2);

    const [qty_topic, setQtyTopic] = useState(0);
    const [qty_trash, setQtyTrash] = useState(0);

    const [tamp, setTamp] = useState();
    const [trash, setTrash] = useState();

    useEffect(() => {
        apiTopic.getAll().then((res) => {
            try {
                const data = res.data;
                const topicData = data.map((item) => {
                    // if(item.status === 2){
                    //     setNameButton('Hien')
                    // }
                    return {
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        parent: item.parent_name,
                        description: item.description,
                        status: item.status
                    }
                });
                setTopics(topicData);
                setQtyTopic(res.qty_topic);
                setQtyTrash(res.qty_trash);
            } catch (e) {
                console.log(e);
            }
            setTamp();
        })
    }, [tamp, trash])


    const handleSubmit = async (e) => {
        if (name !== '') {
            e.preventDefault();
            const topic = {
                name: name,
                parent_id: parent_id,
                description: description,
                status: status
            };

            await apiTopic.createTopic(topic).then((res) => {
                if (res.data != null) {
                    alert("Thêm dữ liệu thành công !")
                    setTamp(res.data.id);
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

    // trash cat
    function trashTopic(id) {
        apiTopic.trashTopic(id).then(function (result) {
            alert(result.data.message);
            setTamp(true)
            
        })
    }

    // hien thi
    function displayTopic(id) {
        apiTopic.displayTopic(id).then(function (result) {
            if (result.data !== null) {
                alert("Cập nhật thành công !");
                setTrash(result.data.id);
            }
            else {
                alert("Không tìm thấy dữ liệu !");
            }
        })
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-10">
                            <h1 className="d-inline">Tất cả chủ đề <sup>({qty_topic})</sup></h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link class="action-btn" to="/admin/list-topic/list-trash" style={{ color: "red" }}>
                                <i class="fa fa-trash" aria-hidden="true"></i>
                                <sup class="count ms-1">{qty_trash}</sup>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <form onSubmit={handleSubmit} >

                                    <div className="mb-3">
                                        <label>Tên chủ đề (*)</label>
                                        <input type="text" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Mô tả(*)</label>
                                        <input type="text" name="name" placeholder="Nhập tên danh mục" className="form-control"
                                            value={description} onChange={(e) => setDescrition(e.target.value)} />
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
                            <div className="col-md-8">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "30px" }}>
                                                <input type="checkbox" />
                                            </th>
                                            <th>Id</th>
                                            {/* <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th> */}
                                            <th>Tên chủ đề</th>
                                            {/* <th>Tên slug</th> */}
                                            <th>Danh mục cha</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topics.map((item, index) => {
                                            return (
                                                <tr className="datarow" key={index}>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td>{item.id}</td>
                                                    {/* <td>
                                                        <img src="../public/images/category.jpg" alt="category.jpg" />
                                                    </td> */}
                                                    <td style={{width:"50%"}}>
                                                        <div className="name">
                                                            {item.name}
                                                        </div>
                                                        <div className="function_style">
                                                            <button onClick={() => displayTopic(item.id)} className="btn btn-sm">{item.status === 2 ? "Hiện" : "Ẩn"}</button> |
                                                            <Link to={`/admin/list-topic/update/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                            <Link to={`/admin/list-topic/show/${item.id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                            <button onClick={() => trashTopic(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                        </div>
                                                    </td>
                                                    {/* <td>{item.slug}</td> */}
                                                    <td>{item.parent}</td>
                                                    <td>{item.status === 2 ? "Ẩn" : "Hiển thị" }</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default ListTopic;