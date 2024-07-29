import axiosInstance from "./axios";

const adminToken = axiosInstance.getAuthToken('admin');

const apiSale = {
    // lay tat ca
    getAll: () => {
        return axiosInstance.get("/sale");
    },

    // lay chi tiet 
    getSaleById: (id) => {
        return axiosInstance.get(`/sale/${id}`);
    },

    // lay chu de theo paret
    // getCatByParent: (parent) => {
        // return axiosInstance.get(`/categories/getByParent/${parent}`).then((res)=>res.data);
    // },

    // them sale
    createSale: (sale) => {
        if(adminToken === null){
            return;
        }
        return axiosInstance.post(`/sale/create`, sale, {
            headers:{
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },

    // cap nhat 
    updateSale: (sale, id) => {
        if(adminToken === null){
            return;
        }
        return axiosInstance.put(`/sale/update/${id}`, sale, {
            headers:{
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },

    // xoa vao thung rac
    trashSale: (id) => {
        return axiosInstance.put(`/sale/trash/${id}`);
    },

    // phuc hoi chu de tu thung rac
    rescoverTrash: (id) => {
        return axiosInstance.put(`/sale/rescover-trash/${id}`);
    },

    // lay danh sach chu de trong thung rac
    getListTrash: ()=>{
        return axiosInstance.get(`/sale/list-trash`).then((res)=>res.data);
    },

    // hien thi chu de
    displaySale: (id) => {
        return axiosInstance.put(`/sale/display/${id}`);
    },

    delSaleByID: (id) => {
        if(adminToken === null){
            return;
        }
        return axiosInstance.delete(`/sale/delete/${id}`, {
            headers:{
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },

    // ds tieu de sale 
    getAllSales: () => {
        return axiosInstance.get(`/sale/get-all`).then(res => res.data);
    },
    

}

export default apiSale;