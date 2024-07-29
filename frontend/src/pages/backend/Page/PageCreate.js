import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiUploadFile from "../../../api/apiUploadFile";
import axiosInstance from "../../../api/axios";
import apiTopic from "../../../api/apiTopic";
import apiPost from "../../../api/apiPost";

function PageCreate() {

    const navigate = useNavigate();

    const [topic, setTopic] = useState([]);

    const [title, setTitle] = useState('');
    const [topic_id, setTopicId] = useState(0);
    const [description_1, setDescription1] = useState('');
    const [description_2, setDescription2] = useState('');
    const [description_3, setDescription3] = useState('');
    const [status, setStatus] = useState(2);

    const token = JSON.parse(localStorage.getItem('adminToken'));


    useEffect(() => {
        apiTopic.getAll().then((res) => {
            try {
                setTopic(res.data);
            } catch (e) {
                console.log(e);
            }
        })
    }, [])


    const uploadImages = async (files) => {
        const imageUrls = await Promise.all(
          files.map(async (file) => {
            let formData = new FormData();
            formData.append("files", file);
            axiosInstance.enableUploadFile();
      
            const res = await apiUploadFile.uploadFile(formData);
            return res.data.filename;
          })
        );
      
        return imageUrls;
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const image_1 = document.querySelector("#image_1");
        const image_2 = document.querySelector("#image_2");
        const image_3 = document.querySelector("#image_3");

        if (title !== '' && description_1 !== '' && description_2 !== '' && image_1.files.length !== 0 && image_2.files.length !== 0) {
            const post = {
                title: title,
                topic_id: topic_id,
                description_1: description_1,
                description_2: description_2,
                description_3: description_3,
                status: status,
                type: "page",
                image_1: "",
                image_2: "",
                image_3: "null",
                created_by: token.user.id
            };

            // // anh 1
            // let file = new FormData();
            // file.append("files_1", image_1.files[0]);
            // axiosInstance.enableUploadFile();

            // await apiUploadFile.uploadFile(file)
            //     .then(async (res) => {
            //         let filename = res.data.filename;
            //         post.image_1 = filename;
            //     })
            //     .catch(e => console.log(e))

            // // anh 2
            // let file2 = new FormData();
            // file2.append("files_2", image_2.files[0]);

            // await apiUploadFile.uploadFile(file2)
            //     .then(async (res) => {
            //         let filename = res.data.filename;
            //         post.image_2 = filename;
            //     })
            //     .catch(e => console.log(e))


            // // anh 3
            // let file3 = new FormData();
            // file3.append("files_3", image_3.files[0]);

            // await apiUploadFile.uploadFile(file3)
            //     .then(async (res) => {
            //         let filename = res.data.filename;
            //         post.image_3 = filename;
            //     })
            //     .catch(e => console.log(e))

            const imageUrls = await uploadImages([
                image_1.files[0],
                image_2.files[0],
                image_3.files[0],
              ]);
          
              // Gán giá trị ảnh vào đối tượng post
              post.image_1 = imageUrls[0];
              post.image_2 = imageUrls[1];
              post.image_3 = imageUrls[2];
            // tao post
            axiosInstance.enableJson();
            const responsePost = await apiPost.createPost(post)
            if (responsePost.data !== null) {
                alert('Thêm dữ liệu thành công !');
                navigate('/admin/pages/1/10', { replace: true });
            } else {
                alert('Thêm dữ liệu thất bại !');
            }

        }
        else {
            e.preventDefault();
            alert('Vui lòng nhập đầu đủ thông tin !')
        }
    };



    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-10">
                            <h1 className="d-inline">Thêm trang đơn</h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link to="/admin/pages/1/10" className="btn btn-sm btn-info">
                                <i className="fa fa-reply me-1" aria-hidden="true"></i>
                                Quay lại
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <form onSubmit={handleSubmit} >

                                    <div className="mb-3">
                                        <label>Tiêu đề trang (*)</label>
                                        <input type="text" name="name" placeholder="Nhập tên bài viết" className="form-control"
                                            value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Chủ đề (*)</label>
                                        <select name="status" className="form-control" value={topic_id} onChange={(e) => setTopicId(e.target.value)}>
                                            <option value="0">None</option>
                                            {topic.map((item, index) => (
                                                <option key={index} value={item.id}>{item.name}</option>

                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label>Hình ảnh (*)</label>
                                        <input id="image_1" type="file" name="image" className="form-control" />
                                        <br />
                                        <input id="image_2" type="file" name="image" className="form-control" />
                                        <br />
                                        <input id="image_3" type="file" name="image" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label>Mô tả ngắn (*)</label>
                                        <textarea type="text" name="description" placeholder="Nhập mô tả bài viết" className="form-control"
                                            value={description_1} onChange={(e) => setDescription1(e.target.value)} rows={10} cols={50} />
                                    </div>
                                    <div className="mb-3">
                                        <label>Mô tả chi tiết (*)</label>
                                        <textarea type="text" name="description" placeholder="Nhập mô tả bài viết" className="form-control"
                                            value={description_2} onChange={(e) => setDescription2(e.target.value)} rows={10} cols={50}/>
                                    </div>
                                    <div className="mb-3">
                                        <label>Mô tả chi tiết (*)</label>
                                        <textarea type="text" name="description" placeholder="Nhập mô tả bài viết" className="form-control"
                                            value={description_3} onChange={(e) => setDescription3(e.target.value)} rows={10} cols={50} />
                                    </div>
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

export default PageCreate;