import axios from "axios"

export const getAllUE = ()=>axios.get('https://application-gestion-note-backend.onrender.com/ue').then(res=>res.data)
export const createUE = (data)=>axios.post('https://application-gestion-note-backend.onrender.com/ue', data).then(res=>res.data)
export const editUE = (data, id)=>axios.patch(`https://application-gestion-note-backend.onrender.com/ue/${id}`, data).then(res=>res.data)
export const deleteUE = (id)=>axios.delete(`https://application-gestion-note-backend.onrender.com/ue/${id}`).then(res=>res.data)
