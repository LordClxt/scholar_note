import { API_URL } from './api'
import axios from "axios";


export const login = (data)=>axios.post(`${API_URL}/auth/Token`, data).then(res=>res.data)