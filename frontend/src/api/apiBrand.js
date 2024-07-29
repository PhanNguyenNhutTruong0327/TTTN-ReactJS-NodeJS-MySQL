import axiosInstance from "./axios";

const adminToken = axiosInstance.getAuthToken('admin');

const apiBrand = {

    // lay tat ca thuong hieu
    getAll: () => {
        return axiosInstance.get("/brands").then((res) => res.data);
    },

    // lay chi tiet thuong hieu
    getBrandById: (id) => {
        return axiosInstance.get(`/brand/${id}`);
    },

    // lay danh thuong hieu trang nguoi dung
    getBrandFE: () => {
        return axiosInstance.get(`/brand/list-brand-fe`).then((res) => res.data);
    },

    // xoa thuong hieu vao thung rac
    trashBrand: (id) => {
        return axiosInstance.get(`/brand/trash/${id}`);
    },

    // phuc hoi thuong hieu tu thung rac
    rescoverTrash: (id) => {
        return axiosInstance.get(`/brand/rescover-trash/${id}`);
    },

    // lay danh sach thuong hieu trong thung rac
    getListTrash: () => {
        return axiosInstance.get(`/brand/list-trash`).then((res) => res.data);
    },

    // hien thi thuong hieu 
    displayBrand: (id) => {
        return axiosInstance.get(`/brand/display/${id}`);
    },


    // xoa vinh vien
    delBrandById: (id) => {
        if (adminToken === null) {
            return;
        }
        return axiosInstance.delete(`/brand/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },


    // them brand
    createBrand: (brand) => {
        if (adminToken === null) {
            return;
        }
        return axiosInstance.post(`/brand/create`, brand, {
            headers: {
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },

    // cap nhat brand
    updateBrand: (brand, id) => {
        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/brand/update/${id}`, brand, {
            headers: {
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },
}

export default apiBrand;