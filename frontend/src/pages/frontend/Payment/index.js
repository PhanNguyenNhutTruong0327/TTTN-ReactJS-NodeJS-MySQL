import { useEffect, useState } from "react";
import { useAuth } from "../../../component/Provider/AuthProvider";
import apiCustomer from "../../../api/apiCustomer";
import { useCart } from "react-use-cart";
import { imageURL } from "../../../api/config";
import apiConfig from "../../../api/apiConfig";
import apiOrder from "../../../api/apiOrder";
import { useNavigate } from "react-router-dom";



function Payment() {

    const { token } = useAuth();
    const navigation = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');
    const [address, setAddress] = useState('');

    const [total, setTotal] = useState(0);
    const [addressStore, setAddressStore] = useState('');

    const product = [];
    const qty = [];
    const price = [];

    // cart
    const {
        isEmpty,
        totalUniqueItems,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
    } = useCart();

    const userItems = items.filter(item => item.user_id == token);
    useEffect(() => {
        const newTotal = userItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(newTotal);

    }, [userItems])

    // map => price ship
    const [distance, setDistance] = useState();
    // Khởi tạo instance của GoogleMapsApi
    // const googleMapsApi = new GoogleMapsApi({
    //     apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // });

    useEffect(() => {
        (async () => {
            await apiCustomer.getCustomerById(token).then(res => {
                setName(res.data.name);
                setEmail(res.data.email);
                setPhone(res.data.phone);
                setAddress(res.data.address);
            });

            await apiConfig.getConfig().then((res) => {
                setAddressStore(res.data.address);
            });



            // googleMapsApi.distanceMatrix({
            //     origins: [address],
            //     destinations: [addressStore],
            //     travelMode: 'DRIVING'
            // })
            //     .then(response => {
            //         const distance = response.rows[0].elements[0].distance.text;
            //         setDistance(distance);
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });
        })();
    }, []);


    // dinh dang gia
    const formatPrice = (price) => {
        const roundedPrice = Math.round(price);
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(roundedPrice);
        return formattedPrice.replace(/,/g, '.') + '.000';
    };


    const [selectedOptionReceive, setSelectedOptionReceive] = useState('Giao hàng tận nơi');

    const handleOptionChange = (event) => {
        setSelectedOptionReceive(event.target.value);
    };

    userItems.map((item) => {
        product.push(item.id);
        qty.push(item.quantity);
        price.push(item.price);
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            'customer_id': token,
            'note': note,
            'shipping_methods': selectedOptionReceive,
            'status': 1,
            'products': product,
            'qty': qty,
            'price': price,

        };
        console.log(order);
        await apiOrder.createOrder(order).then(res => {
            if (Object.keys(res.data).length > 0) {
                alert('Bạn đã đặt hàng thành công !');
                userItems.forEach(item => {
                    removeItem(item.id);
                });
                navigation('/');
            }
            else {
                alert('Đơn hàng đã bị lỗi. Hãy thử lại sau !');
            }
        })

    }

    return (
        <section className="section-content padding-y">
            <form onSubmit={handleSubmit}>
                <div className="container" style={{ maxWidth: "720px" }}>
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="text-center">
                                <h5 className="">THÔNG TIN ĐƠN HÀNG</h5>
                            </div>
                            <br />
                            <div className="cart">
                                <label>Sản phẩm:</label>
                                {userItems.map((item, index) => (
                                    <div className="row mb-3">
                                        <div className="col-md-2">
                                            <img src={imageURL + item.image} alt="anh san pham" style={{ width: "100%", height: "auto" }} />
                                        </div>
                                        <div className="col-md-10">
                                            <b>{item.name}</b>
                                            <br />
                                            <span className="text-danger">Giá: {formatPrice(item.price)}</span>
                                            <br />
                                            <span>Số lượng: {item.quantity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <span><b>Tổng phụ:</b> {formatPrice(total)}</span>
                            <br />
                            <br />
                            <label >Phương thức nhận hàng</label>
                            <div className="form-row">
                                <div className="form-group col-sm-6">
                                    <label className="js-check box">
                                        <input type="radio" name="dostavka" value="Giao hàng tận nơi" checked={selectedOptionReceive === 'Giao hàng tận nơi'} onChange={handleOptionChange} />
                                        <h6 className="title">Giao hàng tận nơi</h6>
                                        <p className="text-muted">Nhận hàng trong 1-2 ngày</p>
                                    </label>
                                </div>
                                <div className="form-group col-sm">
                                    <label className="js-check box">
                                        <input type="radio" name="dostavka" value="Nhận trực tiếp tại cửa hàng" checked={selectedOptionReceive === 'Nhận trực tiếp tại cửa hàng'} onChange={handleOptionChange} />
                                        <h6 className="title">Nhận trực tiếp tại cửa hàng</h6>
                                        <p className="text-muted">Nhận hàng nhanh chóng</p>
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Họ tên</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="col form-group">
                                    <label>Ghi chú</label>
                                    <input value={note} onChange={(e) => setNote(e.target.value)} type="text" className="form-control" placeholder="" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col form-group">
                                    <label>Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="" />
                                </div>
                                <div className="col form-group">
                                    <label>Số điện thoại</label>
                                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" placeholder="" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Địa chỉ</label>
                                <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" rows="2"></textarea>
                            </div>

                        </div>
                    </div>


                    <div className="card mb-4">
                        <div className="card-body">
                            <b className="mb-4">Phương thức thanh toán</b>
                            <br />
                            <br />
                            <div className="row">
                                <div className="form-group col-sm-6">
                                    <label className="js-check box">
                                        <input type="radio" name="payment" value="option1" />
                                        <h6 className="title">Thanh toán khi nhận hàng</h6>
                                        {/* <p className="text-muted">Nhận hàng trong 1-2 ngày</p>  */}
                                    </label>
                                </div>
                                <div className="form-group col-sm-6">
                                    <label className="js-check box">
                                        <input type="radio" name="payment" value="option1" />
                                        <h6 className="title">Thanh toán qua MoMo</h6>
                                        {/* <p className="text-muted">Nhận hàng nhanh chóng</p> */}
                                    </label>
                                </div>
                            </div>
                            <button className="subscribe btn btn-primary btn-block"> Đặt hàng </button>
                        </div>
                    </div>


                    <br /><br />

                </div>
            </form>
        </section>

    );
}

export default Payment;