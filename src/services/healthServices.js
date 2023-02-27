import axios from "./utils/baseAxios";

const baseHealth = "health";
export const getHealth = async () => {
  return await axios.get(`${baseHealth}`);
};


export const addHealth = async (user) => {
  return await axios.post(`${baseHealth}`, user);
};