import axiosInstance from "./axios";

const adminToken = axiosInstance.getAuthToken('admin');

const apiBanner = {
    // lay slider theo position
    getSliderByPosition: (position) => {
        return axiosInstance.get(`/banner/${position}`);
    },

    // lay slider trang admin
    getAllBannerBE: (position) => {
        return axiosInstance.get(`/banners`);
    },

    // lay chi tiet 
    getOne: (id) => {
        return axiosInstance.get(`/banner/show/${id}`);
    },

    // them banner
    createBanner: (banner) => {
        console.log(adminToken.jwt);
        if (adminToken === null) {
            return;
        }
        return axiosInstance.post(`/banner/create`, banner, {
            headers: {
                Authorization: `Bearer ${adminToken.jwt}`
            }
        });
    },

    // cap nhat banner
    updateBanner: (banner, id) => {
        if (adminToken === null) {
            return;
        }
        return axiosInstance.put(`/banner/update/${id}`, banner, {
            headers: {
                Authorization: `Bearer ${adminToken.jwt}`
            }

        });
    },

    // xoa vao thung rac
    trashBanner: (id) => {
        return axiosInstance.put(`banner/trash/${id}`);
    },

    // phuc hoi thung rac
    rescoverTrash: (id) => {
        return axiosInstance.put(`banner/rescover-trash/${id}`);
    },

    // an, hien
    displayBanner: (id) => {
        return axiosInstance.put(`banner/display/${id}`);
    },

    // ds thung rac
    getListTrash: () => {
        return axiosInstance.get(`banner/get-list-trash`);
    },

    // xoa vinh vien
    deleteBanner: (id) => {
        if (adminToken === null) {
            return;
        }
        return axiosInstance.delete(`banner/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${adminToken.jwt}`
            }

        });
    }

}

export default apiBanner;