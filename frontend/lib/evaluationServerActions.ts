import { API_URL } from './api'
import axios from "axios"

export const getAllEvaluation = ()=>axios.get(`${API_URL}/evaluations_perso`).then(res=>res.data)
export const createEvaluation = (data)=>axios.post(`${API_URL}/evaluations`, data).then(res=>res.data)
export const editEvaluation = (data, id)=>axios.patch(`${API_URL}/evaluations/${id}`, data).then(res=>res.data)
export const deleteEvaluation = (id)=>axios.delete(`${API_URL}/evaluations/${id}`).then(res=>res.data)
export const getModuleEvaluation = (module)=>axios.get(`${API_URL}/etudiants/module/${module}`).then(res=>res.data)
