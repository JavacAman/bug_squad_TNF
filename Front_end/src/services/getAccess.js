import axiosInstance from "../middlewares/axiosInstance";

const getAccess = async (userID) => {
    try {
    
        const response = await axiosInstance.get(`/get/auth`, {
            params: {
                BundleName: userID, 
            }
        });
        console.log("response1",response)
        return response;
    } catch (error) {
        console.error('Error fetching api key:', error);
        throw error;
    }
};

export default getAccess;