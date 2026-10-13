import { API_URL } from './api'
import axios from "axios"

export const getAllFiliereModule = ()=>axios.get(`${API_URL}/filiere_module`).then(res=>res.data)
export const createFiliereModule = (data)=>axios.post(`${API_URL}/filiere_module`, data).then(res=>res.data)
export const editFiliereModule = (data, id)=>axios.patch(`${API_URL}/filiere_module/${id}`, data).then(res=>res.data)
export const deleteFiliereModule = (id)=>axios.delete(`${API_URL}/filiere_module/${id}`).then(res=>res.data)

export const getAllFiliereByModule = (id)=>axios.get(`${API_URL}/filiere_module/module/`+id).then(res=>res.data)

