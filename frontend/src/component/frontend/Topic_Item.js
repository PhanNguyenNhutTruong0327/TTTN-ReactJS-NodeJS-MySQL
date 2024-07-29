import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './menu.css';
import apiTopic from "../../api/apiTopic";

function Topic_Item(props) {

    const rowmenu = props.menu;
    const [menuItem, setMenuItem] = useState([]);

    try {
        useEffect(() => {
            apiTopic.getTopicByParentId(rowmenu.id).then((res) => {
                try {
                    const categoryData = res.map((item) => {
                        return {
                            id: item.id,
                            name: item.name,
                            slug: item.slug,
                            parent: item.parent_id
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
                <Link className="nav-link" to={`/tin-tuc/${rowmenu.slug}/1/10`}>{rowmenu.name}</Link>
            </li>

        );
    }
    else {
        return (
            <li className="nav-item dropdown parent-menu">
                <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to={`/tin-tuc/${rowmenu.slug}/1/10`}> {rowmenu.name} </Link>
                <div className="dropdown-menu dropdown-large ps-3 child-menu">
                    <nav className="row">
                        <div className="">
                            {menuItem.map((item, index) => {
                                return (
                                    <Link to={`/tin-tuc/${item.slug}/1/10`} key={index}>{item.name}</Link>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </li>
        );
    }
}

export default Topic_Item;