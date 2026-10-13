import axios from "axios"

export const getAllEtudiant = ()=>axios.get('https://application-gestion-note-backend.onrender.com/etudiants').then(res=>res.data)
export const createEtudiant = (data)=>axios.post('https://application-gestion-note-backend.onrender.com/auth/etudiant/inscription', data).then(res=>res.data)
export const editEtudiant = (data, id)=>axios.patch(`https://application-gestion-note-backend.onrender.com/etudiants/${id}`, data).then(res=>res.data)
export const deleteEtudiant = (id)=>axios.delete(`https://application-gestion-note-backend.onrender.com/etudiants/${id}`).then(res=>res.data)
export const mesEvaluation = (matricule)=>axios.get(`https://application-gestion-note-backend.onrender.com/etudiants/note/${matricule}`).then(res=>res.data)
