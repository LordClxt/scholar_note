import { API_URL } from './api'
import axios from "axios"

export const getAllNiveau = ()=>axios.get(`${API_URL}/niveau`).then(res=>res.data)
export const createNiveau = (data)=>axios.post(`${API_URL}/niveau`, data).then(res=>res.data)
export const editNiveau = (data, id)=>axios.patch(`${API_URL}/niveau/${id}`, data).then(res=>res.data)
export const deleteNiveau = (id)=>axios.delete(`${API_URL}/niveau/${id}`).then(res=>res.data)
