import axios from "axios"

export const getAllFiliere = ()=>axios.get('https://application-gestion-note-backend.onrender.com/filieres').then(res=>res.data)
export const createFiliere = (data)=>axios.post('https://application-gestion-note-backend.onrender.com/filieres', data).then(res=>res.data)
export const editFiliere = (data, id)=>axios.patch(`https://application-gestion-note-backend.onrender.com/filieres/${id}`, data).then(res=>res.data)
export const deleteFiliere = (id)=>axios.delete(`https://application-gestion-note-backend.onrender.com/filieres/${id}`).then(res=>res.data)
export const getOneFiliere = (id)=>axios.get(`https://application-gestion-note-backend.onrender.com/filieres/${id}`).then(res=>res.data)