import { API_URL } from './api'
import axios from "axios"

export const getAllPeriode = ()=>axios.get(`${API_URL}/periodes`).then(res=>res.data)
export const createPeriode = (data)=>axios.post(`${API_URL}/periodes`, data).then(res=>res.data)
export const editPeriode = (data, id)=>axios.patch(`${API_URL}/periodes/${id}`, data).then(res=>res.data)
export const deletePeriode = (id)=>axios.delete(`${API_URL}/periodes/${id}`).then(res=>res.data)
