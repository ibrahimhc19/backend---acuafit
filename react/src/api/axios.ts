import axios from "axios";

export default axios.create({
    // baseURL: "https://acuafit.up.railway.app/",
    baseURL: import.meta.env.VITE_APP_API_URL,
    withXSRFToken: true,
    withCredentials: true,
});
