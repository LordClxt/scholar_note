import { API_URL } from './api'
import axios from "axios"

export const getAllUE = ()=>axios.get(`${API_URL}/ue`).then(res=>res.data)
export const createUE = (data)=>axios.post(`${API_URL}/ue`, data).then(res=>res.data)
export const editUE = (data, id)=>axios.patch(`${API_URL}/ue/${id}`, data).then(res=>res.data)
export const deleteUE = (id)=>axios.delete(`${API_URL}/ue/${id}`).then(res=>res.data)
