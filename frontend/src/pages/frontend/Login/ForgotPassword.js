import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [method, setMethod] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const phoneRegex = /^\d{10,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let method = '';

        if (phoneRegex.test(email)) {
            method = 'phone';
        } else if (emailRegex.test(email)) {
            method = 'email';
        }

        const data = {
            value: email,
            method: method
        };

        console.log(data);
    };



    return (
        <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
            <div className="card mx-auto" style={{ maxWidth: "400px", marginTop: "100px" }}>
                <div className=" text-center border-bottom">
                    <label className=" card-title p-2">Quên mật khẩu</label>
                </div>
                <div className="card-body">
                    <p>Vui lòng nhập email hoặc số di động để lấy mã otp.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} name="" className="form-control" placeholder="Email hoặc số điện thoại" type="text" />
                        </div>

                        <div className="form-group d-flex ">
                            <button type="submit" className="btn btn-primary ">Lấy OTP</button>
                            <Link type="submit" to="/login" className="btn me-2"> Hủy  </Link>
                        </div>
                    </form>
                </div>
            </div>

            <br /><br />
        </section>

    );
}

export default ForgotPassword;