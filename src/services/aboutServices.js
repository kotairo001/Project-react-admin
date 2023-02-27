import axios from "./utils/baseAxios";

const baseAbout = "about";
export const getAbout = async () => {
    return await axios.get(`${baseAbout}`);
  };
  
  export const updateAbout = async (id, data) => {
    return await axios.put(`${baseAbout}/${id}`, data)
  };
  