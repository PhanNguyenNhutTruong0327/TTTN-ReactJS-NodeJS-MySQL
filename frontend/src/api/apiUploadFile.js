import axiosInstance from "./axios";

const apiUploadFile = {

    uploadFile: (brand) => {
        return axiosInstance.post(`/upload`, brand);
    },


}

export default apiUploadFile;