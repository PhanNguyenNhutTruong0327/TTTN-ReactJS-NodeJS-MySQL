import axiosInstance from "./axios";

const apiOrder = {

    // lay ds order voi user_id
    getOrderByUserId: (user_id, page, limit) => {
        return axiosInstance.get(`/order/order-by-user-id/${user_id}?page=${page}&limit=${limit}`).then(res => res.data);
    },

    // ds tat ca don hang (ch giao, dang giao, da giao) theo user_id
    getAllOrderByUserId: (user_id, page,limit)=>{
        return axiosInstance.get(`/order/list-order-by-user-id/${user_id}?page=${page}&limit=${limit}`).then(res => res.data);
    },

    // tao don hang
    createOrder: (data) => {
        return axiosInstance.post(`/order/create`,data);
    },

    // ds tat ca don hang
    getAll: (page, limit) => {
        return axiosInstance.get(`/orders?page=${page}&limit=${limit}`).then(res => res.data);
    },

    //chi tiet don hang
    getOne: (id) => {
        return axiosInstance.get(`/order/show/${id}`);
    },

    // ds don hang bi huy
    getOrderCancel: (page,limit)=> {
        return axiosInstance.get(`/orders/cancel?page=${page}&limit=${limit}`).then(res => res.data);
    },

    // cap nhat trang thai don hang
    updateStatusOrder: (data, id) => {
        return axiosInstance.put(`/order/update-status/${id}`,data);
    }

}

export default apiOrder;