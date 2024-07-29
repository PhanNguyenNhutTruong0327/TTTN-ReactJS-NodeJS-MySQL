import { Link } from "react-router-dom";
import { useAuth } from "../../../component/Provider/AuthProvider";
import { useState } from "react";
import apiCustomer from "../../../api/apiCustomer";

function Login() {

    const { setToken } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    async function login(event) {

        event.preventDefault();
        if (email !== '' && password !== '') {
            const data = {
                email: email,
                password: password
            };
            await apiCustomer.checkLogin(data).then(function (result) {
                if (result.data.data === null) {
                    alert(result.data.message);
                }
                else {
                    alert(result.data.message);
                    setToken(result.data.data.id);
                }
            })

        }
        else{
            alert('Vui lòng nhập đầy đủ thông tin !')
        }

    }



    return (
        <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
            <div className="card mx-auto" style={{ maxWidth: "380px", marginTop: "100px" }}>
                <label className="card-title mb-2 mt-2 text-center">ĐĂNG NHẬP</label>

                <div className="card-body">
                    <form onSubmit={login}>
                        <div className="row">
                            <Link to="#" className="btn mb-2 text-white" style={{backgroundColor:"#0d6efd"}}> <i className="fab fa-facebook-f"></i>  Facebook</Link>
                            <Link href="#" className="btn btn-block mb-4 text-white" style={{backgroundColor:"#af0000"}}> <i className="fab fa-google"></i> Google</Link>
                        </div>
                        <div className="form-group">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} name="" className="form-control" placeholder="Email" type="email" />
                        </div>
                        <div className="form-group">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} name="" className="form-control" placeholder="Password" type="password" />
                        </div>

                        <div className="form-group">
                            <Link to={`/login/forgot-password`} className="float-right">Quên mật khẩu ?</Link>
                            <label className="float-left custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" />
                                <div className="custom-control-label"> Remember </div> </label>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Đăng nhập  </button>
                        </div>
                    </form>
                </div>
            </div>

            <p className="text-center mt-4">Don't have account? <Link to="/register">Sign up</Link></p>
            <br /><br />
        </section>

    );
}
export default Login;