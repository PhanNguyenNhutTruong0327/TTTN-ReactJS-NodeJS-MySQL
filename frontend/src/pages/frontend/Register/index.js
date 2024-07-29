import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiCustomer from "../../../api/apiCustomer";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat_password, setRepeatPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name !== '' && phone !== '' && email !== '' && password !== '' && repeat_password !== ''){
            if(password === repeat_password) {
                const data = {
                    name: name,
                    phone: phone,
                    user_name:'',
                    email: email,
                    password: password,
                    status: 1,
                    user_name:''
                };
                console.log(data);

                await apiCustomer.createCustomer(data).then((res) => {
                    if(res.data.success === 'true'){
                        alert('Bạn đã đăng ký thành công !');
                        navigate('/login');

                    }
                    else{
                        alert(res.data.message);
                    }
                })
            }
            else{
                alert('Mật khẩu không khớp với nhau !');
            }
        }
        else{
            alert('Vui lòng nhập đầy đủ thông tin !');
        }
    }

    return (
        <section className="section-content padding-y">

            <div className="card mx-auto" style={{ maxWidth: "520px", marginTop: "40px" }}>
                <label className="card-title text-center pt-3">Đăng ký</label>

                <article className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col form-group">
                                <label>Họ tên *</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="" />
                            </div>
                            <div className="col form-group">
                                <label>Số điện thoại *</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder=""
                                    inputMode="numeric"
                                    pattern="[0-9]{10}"
                                    title="Vui lòng nhập số điện thoại gồm 10 chữ số."
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email *</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="" />
                            <small className="form-text text-muted">Chúng tôi sẽ không bao giờ chia sẻ email của bạn với bất kỳ ai khác</small>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Repeat password</label>
                                <input value={repeat_password} onChange={(e) => setRepeatPassword(e.target.value)} className="form-control" type="password" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Đăng ký  </button>
                        </div>
                    </form>
                </article>
            </div>
            <p className="text-center mt-4">Have an account? <Link to="/login">Log In</Link></p>
            <br /><br />


        </section>

    );
}
export default Register;