import { useEffect, useState } from "react";
import { Link, useAsyncValue, useNavigate } from "react-router-dom"
import apiCategory from "../../api/apiCategory";
import Menu_Item from "../../component/frontend/Menu_Item";
import { useAuth } from "../../component/Provider/AuthProvider";
import { useCart } from "react-use-cart";
import apiConfig from "../../api/apiConfig";
import { imageURL } from "../../api/config";
import apiCustomer from "../../api/apiCustomer";


function Header() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // chuyen trang

  const [key, setKey] = useState('');

  const { token, setToken } = useAuth();

  const [qty_order, setQuyOrder] = useState(0);
  const { items } = useCart();

  const [logo, setLogo] = useState('');

  const [name, setName] = useState('');

  useEffect(() => {
    try {
      apiCategory.getCatByParent(0).then((res) => {
        try {
          const categoryData = res.map((item) => {
            return {
              id: item.id,
              name: item.category_name,
              slug: item.slug,
              parent: item.parent
            }
          });
          setCategories(categoryData);
        }
        catch (err) {
          console.log(err);
        }
      })

      apiConfig.getConfig().then((res) => {
        setLogo(res.data.logo);
      })

      apiCustomer.getCustomerById(token).then(res => {
        setName(res.data.name);
      })

      setQuyOrder(items.filter(item => item.user_id == token).length);

    } catch (e) { console.log(e) }

  }, [items, token])

  const handleSearch = (e) => {
    setKey(e.target.value);
    if (e.target.value.length > 0) {
      navigate(`/tim-kiem/${e.target.value}/1/12`);
    }
    else {
      navigate(`/`);
    }
  };

  const logout = () => {
    // Thực hiện đăng xuất
    localStorage.removeItem("token");
    setToken(null);
  };


  return (
    <div>

      <header className="section-header">
        <section className="header-main border-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-md-12">
                <Link to="/" className="brand-wrap">
                  <img className="logo" src={imageURL + logo} alt="logo" />
                </Link>
              </div>
              <div className="col-xl-6 col-lg-5 col-md-6">
                <form action="#" className="search-header">
                  <div className="input-group w-100">
                    {/* <select className="custom-select border-right" name="category_name">
                      <option value="">All type</option><option value="codex">Special</option>
                      <option value="comments">Only best</option>
                      <option value="content">Latest</option>
                    </select> */}
                    <input type="text" className="form-control" placeholder="Search" style={{ height: "40px", borderColor: "#ff6a00" }} value={key} onChange={handleSearch} />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">
                        <i className="fa fa-search"></i> Tìm kiếm
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widgets-wrap float-md-right">
                  <div className="widget-header mr-3">
                    <Link to="/tai-khoan" className="widget-view">
                      <div className="icon-area">
                        <i className="fa fa-user"></i>
                        {/* <span className="notify">3</span> */}
                      </div>
                      <small className="text">{name ? name : "Tài khoản"} </small>
                    </Link>
                  </div>
                  <div className="widget-header mr-3">
                    <a href="#" className="widget-view">
                      <div className="icon-area">
                        <i className="fa fa-comment-dots"></i>
                        {/* <span className="notify">1</span> */}
                      </div>
                      <small className="text"> Thông báo </small>
                    </a>
                  </div>
                  {/* <div className="widget-header mr-3">
                    <a href="#" className="widget-view">
                      <div className="icon-area">
                        <i className="fa fa-store"></i>
                      </div>
                      <small className="text"> Orders </small>
                    </a>
                  </div> */}
                  <div className="widget-header">
                    <Link to="/cart" className="widget-view">
                      <div className="icon-area">
                        <i className="fa fa-shopping-cart"></i>
                        <span className="notify">{qty_order}</span>
                      </div>
                      <small className="text"> Giỏ hàng </small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        <nav className="navbar navbar-main navbar-expand-lg border-bottom">
          <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="main_nav">
              <ul className="navbar-nav">
                {categories.map((menu, index) => {
                  return (
                    console.log(menu),

                    <Menu_Item menu={menu} key={index} />
                    // console.log(menu)
                    // <li className="nav-item">
                    //   <a className="nav-link" href="#">{menu.name}</a>
                    // </li>

                  )
                })}

                {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#"> Shop </a>
                  <div className="dropdown-menu dropdown-large ps-3">
                    <nav className="row">
                      <div className="">
                        <a href="page-index-1.html">Home page 1</a>
                        <a href="page-index-2.html">Home page 2</a>
                        <a href="page-category.html">All category</a>
                        <a href="page-listing-large.html">Listing list</a>
                        <a href="page-listing-grid.html">Listing grid</a>
                        <a href="page-shopping-cart.html">Shopping cart</a>
                        <a href="page-detail-product.html">Product detail</a>
                        <a href="page-content.html">Page content</a>
                        <a href="page-user-login.html">Page login</a>
                        <a href="page-user-register.html">Page register</a>
                      </div>
                    </nav>
                  </div>
                </li> */}

                {/* <li className="nav-item">
                  <a className="nav-link" href="#">Category</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Category</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">Category</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Category</a>
                </li> */}

              </ul>


              <ul className="navbar-nav ml-md-auto">
                <li className="nav-item">
                  {token ? (
                    <button className="nav-link" onClick={logout}>Đăng xuất</button>
                  ) : (
                    <Link className="nav-link" to="/login">Đăng nhập</Link>
                  )}                </li>
                {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="http://example.com" data-toggle="dropdown">English</a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Russian</a>
                    <a className="dropdown-item" href="#">French</a>
                    <a className="dropdown-item" href="#">Spanish</a>
                    <a className="dropdown-item" href="#">Chinese</a>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>

      </header>

    </div>

  );
}

export default Header;