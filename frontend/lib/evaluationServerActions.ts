import axios from "axios"

export const getAllEvaluation = ()=>axios.get('https://application-gestion-note-backend.onrender.com/evaluations_perso').then(res=>res.data)
export const createEvaluation = (data)=>axios.post('https://application-gestion-note-backend.onrender.com/evaluations', data).then(res=>res.data)
export const editEvaluation = (data, id)=>axios.patch(`https://application-gestion-note-backend.onrender.com/evaluations/${id}`, data).then(res=>res.data)
export const deleteEvaluation = (id)=>axios.delete(`https://application-gestion-note-backend.onrender.com/evaluations/${id}`).then(res=>res.data)
export const getModuleEvaluation = (module)=>axios.get(`https://application-gestion-note-backend.onrender.com/etudiants/module/${module}`).then(res=>res.data)
