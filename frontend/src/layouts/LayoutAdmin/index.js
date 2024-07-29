import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Menu from "./Menu"

import "./style.css";
import "../../assets/backend/dist/js/adminlte.min.js"
import '../../assets/backend/plugins/fontawesome-free/css/all.min.css';
import '../../assets/backend/dist/css/adminlte.min.css'; 


function LayoutAdmin() {
    return (
        <div className="admin-root">
            <div className="hold-transition sidebar-mini">
                <div className="wrapper">
                    <Header />
                    <Menu />
                    <Outlet />
                    <Footer />
                </div>
            </div>

        </div>
    );
}

export default LayoutAdmin;