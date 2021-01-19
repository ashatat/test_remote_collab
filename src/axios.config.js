import axios from 'axios';

const axiosInstance = () => {
  const token = localStorage.getItem('token');
  axios.defaults.withCredentials = true;
  return axios.create({
    // baseURL: "http://localhost:5000/v1/",
    baseURL: 'http://api.ahmedshatat.me/v1/',
    headers: { Authorization: `Bearer ${token}` },
    // withCredentials: true,
  });
};

export default axiosInstance;
