import axios from "axios";


export const login = (data)=>axios.post('https://application-gestion-note-backend.onrender.com/auth/Token', data).then(res=>res.data)