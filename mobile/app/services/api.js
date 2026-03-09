import axios from "axios";

 const api =axios.create({
    baseURL: "https://book-store-z4fh.onrender.com/api/auth"
})

export default api;