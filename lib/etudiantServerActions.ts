import axios from "axios"

export const getAllEtudiant = ()=>axios.get('http://127.0.0.1:8000/etudiants').then(res=>res.data)
export const createEtudiant = (data)=>axios.post('http://127.0.0.1:8000/auth/etudiant/inscription', data).then(res=>res.data)
export const editEtudiant = (data, id)=>axios.patch(`http://127.0.0.1:8000/etudiants/${id}`, data).then(res=>res.data)
export const deleteEtudiant = (id)=>axios.delete(`http://127.0.0.1:8000/etudiants/${id}`).then(res=>res.data)
export const mesEvaluation = (id)=>axios.get(`http://127.0.0.1:8000/etudiants/note/${id}`).then(res=>res.data)
