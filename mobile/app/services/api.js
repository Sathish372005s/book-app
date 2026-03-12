import axios from "axios";

 const api =axios.create({
    baseURL: "https://book-app-xb7z.onrender.com/api/auth"
})

export default api;