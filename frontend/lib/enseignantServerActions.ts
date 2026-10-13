import axios from "axios"

export const getAllEnseignant = ()=>axios.get('https://application-gestion-note-backend.onrender.com/enseignants').then(res=>res.data)
export const createEnseignant = (data)=>axios.post('https://application-gestion-note-backend.onrender.com/auth/enseignant/inscription', data).then(res=>res.data)
export const editEnseignant = (data, id)=>axios.patch(`https://application-gestion-note-backend.onrender.com/enseignants/${id}`, data).then(res=>res.data)
export const deleteEnseignant = (id)=>axios.delete(`https://application-gestion-note-backend.onrender.com/enseignants/${id}`).then(res=>res.data)
