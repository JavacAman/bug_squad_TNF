import axiosInstance from "../middlewares/axiosInstance";

const getBundles = async (searchInput) => {
    try {
    
        const response = await axiosInstance.get(`/bundles/bundleName`, {
            params: {
                BundleName: searchInput, 
            }
        });
        console.log("response1",response)
        return response;
    } catch (error) {
        console.error('Error fetching bundles:', error);
        throw error;
    }
};


const getSearchedBundle= async (searchInput)=>{
    try {
    
        const response = await axiosInstance.get(`/bundles/search`, {
            params: {
                searchQuery: searchInput, 
            }
        });
        console.log("response1",response)
        return response;
    } catch (error) {
        console.error('Error fetching bundles:', error);
        throw error;
    }

}

export { getBundles, getSearchedBundle };