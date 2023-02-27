import axios from "./utils/baseAxios";

const baseURL = "user";
const baseNews = "news";

export const getUser = async () => {
  return await axios.get(`${baseURL}`);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${baseURL}/${id}`);
};

export const addUser = async (user) => {
  return await axios.post(`${baseURL}`, user);
};

export const updateUser = async (id, status) => {
  return await axios.put(`${baseURL}/${id}`, status);
};

export const getNews = async () => {
  return await axios.get(`${baseNews}`);
};

export const deleteNews = async (id) => {
  return await axios.delete(`${baseNews}/${id}`);
};

export const addNews = async (user) => {
  return await axios.post(`${baseNews}`, user);
};

export const updateNews = async (id, status) => {
  return await axios.put(`${baseNews}/${id}`, status);
};

const baseVaccine = 'vaccine'
export const getVaccine = async() => {
    return await axios.get(`${baseVaccine}`)
}

export const deleteVaccine = async(id) => {
    return await axios.delete(`${baseVaccine}/${id}`)
}

export const addVaccine = async(user) => {
    return await axios.post(`${baseVaccine}`, user)
}

export const updateVaccine = async(id, status) => {
    return await axios.put(`${baseVaccine}/${id}`, status)
}

const baseHospital = 'hospital'
export const getHospital = async() => {
    return await axios.get(`${baseHospital}`)
}

export const deleteHospital = async(id) => {
    return await axios.delete(`${baseHospital}/${id}`)
}

export const addHospital = async(user) => {
    return await axios.post(`${baseHospital}`, user)
}

export const updateHospital = async(id, status) => {
    return await axios.put(`${baseHospital}/${id}`, status)
}
// export {getUser, deleteUser, addUser, updateUser}
