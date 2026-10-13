import axios from "axios"

export const getAllModule = ()=>axios.get('https://application-gestion-note-backend.onrender.com/modules').then(res=>res.data)
export const getModule = (module)=>axios.get('https://application-gestion-note-backend.onrender.com/modules/'+module).then(res=>res.data)
export const createModule = (data)=>axios.post('https://application-gestion-note-backend.onrender.com/modules', data).then(res=>res.data)
export const editModule = (data, id)=>axios.patch(`https://application-gestion-note-backend.onrender.com/modules/${id}`, data).then(res=>res.data)
export const deleteModule = (id)=>axios.delete(`https://application-gestion-note-backend.onrender.com/modules/${id}`).then(res=>res.data)
