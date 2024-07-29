import { useEffect, useState } from "react";
import apiCategory from "../../api/apiCategory";
import { Link } from "react-router-dom";
import './menu.css';

function Menu_Item(props) {

    const rowmenu = props.menu;
    const [menuItem, setMenuItem] = useState([]);

    try {
        useEffect(() => {
            apiCategory.getCatByParent(rowmenu.id).then((res) => {
                try {
                    const categoryData = res.map((item) => {
                        return {
                            id: item.id,
                            name: item.category_name,
                            slug: item.slug,
                            parent: item.parent
                        }
                    });
                    setMenuItem(categoryData);
                }
                catch (err) {
                    console.log(err);
                }
            })
        }, []);
    } catch (err) { console.log(err); }
    

    if (menuItem.length === 0) {
        return (
            <li className="nav-item">
                <Link className="nav-link" to={`/danh-muc/${rowmenu.slug}/1/10`}>{rowmenu.name}</Link>
            </li>

        );
    }
    else {
        return (
            <li className="nav-item dropdown parent-menu">
                <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to={`/danh-muc/${rowmenu.slug}/1/10`}> {rowmenu.name} </Link>
                <div className="dropdown-menu dropdown-large ps-3 child-menu">
                    <nav className="row">
                        <div className="">
                            {menuItem.map((item, index) => {
                                return (
                                    <Link to={`/danh-muc/${item.slug}/1/10`} key={index}>{item.name}</Link>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </li>
        );
    }
}

export default Menu_Item;