import axios from "axios"

export const getAllFiliereModule = ()=>axios.get('https://application-gestion-note-backend.onrender.com/filiere_module').then(res=>res.data)
export const createFiliereModule = (data)=>axios.post('https://application-gestion-note-backend.onrender.com/filiere_module', data).then(res=>res.data)
export const editFiliereModule = (data, id)=>axios.patch(`https://application-gestion-note-backend.onrender.com/filiere_module/${id}`, data).then(res=>res.data)
export const deleteFiliereModule = (id)=>axios.delete(`https://application-gestion-note-backend.onrender.com/filiere_module/${id}`).then(res=>res.data)

export const getAllFiliereByModule = (id)=>axios.get('https://application-gestion-note-backend.onrender.com/filiere_module/module/'+id).then(res=>res.data)

