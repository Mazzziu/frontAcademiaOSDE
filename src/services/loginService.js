import axios from "./axiosInstance";

const loginService = {
    login: (email, password) => {
        return axios.post("/usuario/login", {
            email,
            password,
        });
    },
};

export default loginService;
