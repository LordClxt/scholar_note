import axios from "axios"

export const getAllPeriode = ()=>axios.get('https://application-gestion-note-backend.onrender.com/periodes').then(res=>res.data)
export const createPeriode = (data)=>axios.post('https://application-gestion-note-backend.onrender.com/periodes', data).then(res=>res.data)
export const editPeriode = (data, id)=>axios.patch(`https://application-gestion-note-backend.onrender.com/periodes/${id}`, data).then(res=>res.data)
export const deletePeriode = (id)=>axios.delete(`https://application-gestion-note-backend.onrender.com/periodes/${id}`).then(res=>res.data)
