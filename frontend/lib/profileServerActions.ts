import { API_URL } from './api'
import axios from "axios";

export const editProfil = (id, data)=>axios.put(`${API_URL}/edit-profile/`+id, data).then(res=>res.data)