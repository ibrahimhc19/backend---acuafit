import axios from "axios";

export default axios.create({
    baseURL: "https://acuafit.up.railway.app/",
    withXSRFToken: true,
    withCredentials: true,
});
