import axios from "axios";


export const login = (data)=>axios.post('http://127.0.0.1:8000/auth/Token', data).then(res=>res.data)