import axiosInstance from "./axios";

const adminToken = axiosInstance.getAuthToken('admin');
const apiCategory = {
    // lay tat ca danh muc
    getAll: () => {
        return axiosInstance.get("/categories").then((res) => res.data);
    },

    // lay chi tiet danh muc
    getCategoryById: (id) => {
        return axiosInstance.get(`/categories/${id}`);
    },

    // lay danh muc theo paret
    getCatByParent: (parent) => {
        return axiosInstance.get(`/categories/getByParent/${parent}`).then((res) => res.data);
    },

    // them category
    createCategory: (category) => {
        if (adminToken === null) {
            return;
        }
        return axiosInstance.post(`/categories/create`, category, {
            headers: {
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },

    // cap nhat category
    updateCategory: (category, id) => {
        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/categories/update/${id}`, category, {
            headers: {
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },

    // xoa danh muc vao thung rac
    trashCategory: (id) => {
        return axiosInstance.get(`/categories/trash/${id}`);
    },

    // phuc hoi danh muc tu thung rac
    rescoverTrash: (id) => {
        return axiosInstance.get(`/categories/rescover-trash/${id}`);
    },

    // lay danh sach danh muc trong thung rac
    getListTrash: () => {
        return axiosInstance.get(`/categories/list-trash`).then((res) => res.data);
    },

    // hien thi danh muc
    displayCat: (id) => {
        return axiosInstance.get(`/categories/display/${id}`);
    },

    // xoa vinh vien
    delCatById: (id) => {
        if(adminToken === null){
            return;
        }
        return axiosInstance.delete(`/categories/delete/${id}`, {
            headers:{
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    }

}

export default apiCategory;