import { API_URL } from './api'
import axios from "axios"

export const getAllEtudiant = ()=>axios.get(`${API_URL}/etudiants`).then(res=>res.data)
export const createEtudiant = (data)=>axios.post(`${API_URL}/auth/etudiant/inscription`, data).then(res=>res.data)
export const editEtudiant = (data, id)=>axios.patch(`${API_URL}/etudiants/${id}`, data).then(res=>res.data)
export const deleteEtudiant = (id)=>axios.delete(`${API_URL}/etudiants/${id}`).then(res=>res.data)
export const mesEvaluation = (matricule)=>axios.get(`${API_URL}/etudiants/note/${matricule}`).then(res=>res.data)
