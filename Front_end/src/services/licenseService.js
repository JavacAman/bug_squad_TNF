import axiosInstance from "../middlewares/axiosInstance";

export const createLicense = async (licenseData) => {
    try {
        console.log("hariom",licenseData)
        const response = await axiosInstance.post('/licenses/createLicense', licenseData);
        console.log("Response from creating license:", response);
        return response.data; 
    } catch (error) {
        console.error('Error creating license:', error);
        throw error;
    }
};

export const getLicense = async () => {
    try {
          console.log("process",process.env)
        const response = await axiosInstance.get('/licenses/licenseName');
        console.log("Response from creating license:", response);
        return response; 
    } catch (error) {
        console.error('Error creating license:', error);
        throw error;
    }
};

export const getLicenseDetails =async (LicenseId)=>{
    try {
    
        const response = await axiosInstance.get(`/licenses/licenseDetails`, {
            params: {
                LicenseId: LicenseId, 
            }
        });
        console.log("response1",response)
        return response;
    } catch (error) {
        console.error('Error fetching bundles:', error);
        throw error;
    }
}


