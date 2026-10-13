import { API_URL } from './api'
import axios from "axios"

export const getAllFiliere = ()=>axios.get(`${API_URL}/filieres`).then(res=>res.data)
export const createFiliere = (data)=>axios.post(`${API_URL}/filieres`, data).then(res=>res.data)
export const editFiliere = (data, id)=>axios.patch(`${API_URL}/filieres/${id}`, data).then(res=>res.data)
export const deleteFiliere = (id)=>axios.delete(`${API_URL}/filieres/${id}`).then(res=>res.data)
export const getOneFiliere = (id)=>axios.get(`${API_URL}/filieres/${id}`).then(res=>res.data)