import { Link } from 'react-router-dom';
import avt from '../../assets/frontend/images/avatars/avt4.jpg'

function Menu() {

    const token = JSON.parse(localStorage.getItem('adminToken'));
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="../backend/index.html" className="brand-link text-center">
                {/* <img src="../public/dist/img/AdminLTELogo.png" alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3" style={{ opacity: ".8" }} /> */}
                <span className="brand-text font-weight-light ">QUẢN TRỊ</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={avt} className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{token.user.name}</a>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Sản phẩm
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={`/admin/list-products/1/10`} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Tất cả sản phẩm</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/admin/discounted-products/1/10`} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Sản phẩm giảm giá</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/list-categories" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Danh mục</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/admin/list-brands" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Thương hiệu</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Bài viết
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={`/admin/list-post/news/1/10`} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Tất cả bài viết</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/admin/list-topic`} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Chủ đề</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/admin/pages/1/10`} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Trang đơn</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Quản lý bán hàng
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={"/admin/list-sale"} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Quản lý sale</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/admin/orders/1/10`} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Tất cả đơn hàng</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/admin/product-import/1/10`} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Nhập hàng</p>
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <a href="export_index.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Xuất hàng</p>
                                    </a>
                                </li> */}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to={`/admin/list-customer`} className="nav-link">
                                <i className="nav-icon far fa-circle text-danger"></i>
                                <p className="text">Khách hàng</p>
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <a href="contact_index.html" className="nav-link">
                                <i className="nav-icon far fa-circle text-danger"></i>
                                <p className="text">Liên hệ</p>
                            </a>
                        </li> */}
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Giao diện
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                {/* <li className="nav-item">
                                    <a href="menu_index.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Menu</p>
                                    </a>
                                </li> */}
                                <li className="nav-item">
                                    <Link to={`/admin/list-banners`} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Banner</p>
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link to={`/admin/list-tag`} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Tag</p>
                                    </Link>
                                </li> */}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Hệ thống
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to={`/admin/list-staff`} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Nhân viên</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/admin/config`} className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Thông tin cửa hàng</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        {/* <li className="nav-header">LABELS</li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-danger"></i>
                                <p className="text">Important</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-warning"></i>
                                <p>Warning</p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-circle text-info"></i>
                                <p>Informational</p>
                            </a>
                        </li> */}
                    </ul>
                </nav>
            </div>
        </aside>

    );
}

export default Menu;