import axios from "axios"

export const getAllNiveau = ()=>axios.get('https://application-gestion-note-backend.onrender.com/niveau').then(res=>res.data)
export const createNiveau = (data)=>axios.post('https://application-gestion-note-backend.onrender.com/niveau', data).then(res=>res.data)
export const editNiveau = (data, id)=>axios.patch(`https://application-gestion-note-backend.onrender.com/niveau/${id}`, data).then(res=>res.data)
export const deleteNiveau = (id)=>axios.delete(`https://application-gestion-note-backend.onrender.com/niveau/${id}`).then(res=>res.data)
