import { API_URL } from './api'
import axios from "axios"

export const getAllModule = ()=>axios.get(`${API_URL}/modules`).then(res=>res.data)
export const getModule = (module)=>axios.get(`${API_URL}/modules/`+module).then(res=>res.data)
export const createModule = (data)=>axios.post(`${API_URL}/modules`, data).then(res=>res.data)
export const editModule = (data, id)=>axios.patch(`${API_URL}/modules/${id}`, data).then(res=>res.data)
export const deleteModule = (id)=>axios.delete(`${API_URL}/modules/${id}`).then(res=>res.data)
