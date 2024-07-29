import axiosInstance from "./axios";

const apiCustomer = {
    // lay tat ca du lieu
    getAll: (page, limit) => {
        return axiosInstance.get(`/customers?page=${page}&limit=${limit}`).then((res) => res.data);
    },

    // lay chi tiet du lieu
    getCustomerById: (id) => {
        return axiosInstance.get(`/customer/show/${id}`);
    },


    // them du lieu
    createCustomer: (data) => {
        return axiosInstance.post(`/customer/create`, data);
    },

    // cap nhat topic
    updateCustomer: (data, id) => {
        return axiosInstance.put(`/customer/update/${id}`, data);
    },

    // xoa du lieu vao thung rac
    trashCustomer: (id) => {
        return axiosInstance.put(`/customer/trash/${id}`);
    },

    // phuc hoi du lieu tu thung rac
    rescoverTrash: (id) => {
        return axiosInstance.put(`/customer/rescover-trash/${id}`);
    },

    // lay danh sach du lieu trong thung rac
    getListTrash: () => {
        return axiosInstance.get(`/customer/list-trash`).then((res) => res.data);
    },

    // hien thi or an
    displayCustomer: (id) => {
        return axiosInstance.put(`/customer/display/${id}`);
    },


    // xoa vinh vien
    delCustomerById: (id) => {
        return axiosInstance.delete(`/customer/delete/${id}`);
    },

    // login
    checkLogin: (data) => {
        return axiosInstance.post(`/customer/check-login`, data);
    },



    // thay doi mat khau
    updatePassword: (data, id) => {
        return axiosInstance.put(`/customer/update-password/${id}`, data);
    },


    // cap nhat tung dia chi cua khach hang
    updataCustomerAddress: (data, id) => {
        return axiosInstance.put(`/customer/update-address/${id}`, data);
    }



}

export default apiCustomer;