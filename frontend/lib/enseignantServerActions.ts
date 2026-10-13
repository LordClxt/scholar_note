import { API_URL } from './api'
import axios from "axios"

export const getAllEnseignant = ()=>axios.get(`${API_URL}/enseignants`).then(res=>res.data)
export const createEnseignant = (data)=>axios.post(`${API_URL}/auth/enseignant/inscription`, data).then(res=>res.data)
export const editEnseignant = (data, id)=>axios.patch(`${API_URL}/enseignants/${id}`, data).then(res=>res.data)
export const deleteEnseignant = (id)=>axios.delete(`${API_URL}/enseignants/${id}`).then(res=>res.data)
