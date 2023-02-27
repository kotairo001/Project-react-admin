import axios from "./utils/baseAxios";

const baseCase = "case";
export const getCase = async () => {
    return await axios.get(`${baseCase}`);
  };
  
  export const deleteCase = async (id) => {
    return await axios.delete(`${baseCase}/${id}`);
  };
  
  export const addCase = async (data) => {
    return await axios.post(`${baseCase}`, data);
  };
  
  export const updateCase = async (id, data) => {
    return await axios.put(`${baseCase}/${id}`, data)
  };
  