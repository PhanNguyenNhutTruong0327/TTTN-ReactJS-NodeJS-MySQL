import axiosInstance from "./axios";

const adminToken = axiosInstance.getAuthToken('admin');

const apiTopic = {
    // lay tat ca chu de
    getAll: () => {
        return axiosInstance.get("/topics").then((res) => res.data);
    },

    // lay chi tiet chu de
    getTopicById: (id) => {
        return axiosInstance.get(`/topic/${id}`);
    },

    // lay chu de parent
    getTopicByParentId: (id) => {
        return axiosInstance.get(`/topic/getParent/${id}`);
    },


    // them chu de
    createTopic: (topic) => {
        if(adminToken === null){
            return;
        }
        return axiosInstance.post(`/topic/create`, topic, {
            headers:{
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },

    // cap nhat topic
    updateTopic: (topic, id) => {
        if(adminToken === null){
            return;
        }
        return axiosInstance.put(`/topic/update/${id}`, topic, {
            headers:{
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },

    // xoa chu de vao thung rac
    trashTopic: (id) => {
        return axiosInstance.put(`/topic/trash/${id}`);
    },

    // phuc hoi chu de tu thung rac
    rescoverTrash: (id) => {
        return axiosInstance.put(`/topic/rescover-trash/${id}`);
    },

    // lay danh sach chu de trong thung rac
    getListTrash: ()=>{
        return axiosInstance.get(`/topic/list-trash`).then((res)=>res.data);
    },

    // hien thi chu de
    displayTopic: (id) => {
        return axiosInstance.put(`/topic/display/${id}`);
    },


    delTopicById: (id) => {
        if(adminToken === null){
            return;
        }
        return axiosInstance.delete(`/topic/delete/${id}`, {
            headers:{
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },


}

export default apiTopic;