import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import '../../assets/frontend/fonts/fontawesome/css/all.min.css';
import '../../assets/frontend/styles/bootstrap.css';
import '../../assets/frontend/styles/ui.css';
import '../../assets/frontend/styles/responsive.css';


function LayoutSite() {
    const location = useLocation();
    console.log(location.pathname); // Kiểm tra 'pathname'
    return (
        <div className="layout_site">
            <Header />
            <Outlet />
            <Footer />
        </div>


    )
}

export default LayoutSite;