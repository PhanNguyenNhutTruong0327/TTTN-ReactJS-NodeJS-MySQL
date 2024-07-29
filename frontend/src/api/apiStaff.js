import axiosInstance from "./axios";

const adminToken = axiosInstance.getAuthToken('admin');
const apiStaff = {
    // lay tat ca du lieu
    getAll: () => {
        return axiosInstance.get(`/users`).then((res) => res.data);
    },

    // lay chi tiet du lieu
    getStaffById: (id) => {
        return axiosInstance.get(`/user/show/${id}`);
    },


    // them 
    createStaff: (data) => {
        return axiosInstance.post(`/user/create`, data);
    },

    // cap nhat 
    updateStaff: (data, id) => {
        if(adminToken === null){
            return;
        }
        return axiosInstance.put(`/user/update/${id}`, data, {
            headers:{
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },

    // xoa du lieu vao thung rac
    trashStaff: (id) => {
        return axiosInstance.put(`/user/trash/${id}`);
    },

    // phuc hoi du lieu tu thung rac
    rescoverTrash: (id) => {
        return axiosInstance.put(`/user/rescover-trash/${id}`);
    },

    // lay danh sach du lieu trong thung rac
    getListTrash: () => {
        return axiosInstance.get(`/user/list-trash`).then((res) => res.data);
    },

    // hien thi or an
    displayStaff: (id) => {
        return axiosInstance.put(`/user/display/${id}`);
    },


    // xoa vinh vien
    delStaffById: (id) => {
        if(adminToken === null){
            return;
        }
        return axiosInstance.delete(`/user/delete/${id}`, {
            headers:{
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },

    // login
    checkLogin: (data) => {
        return axiosInstance.post(`/user/check-login`, data);
    },


}

export default apiStaff;