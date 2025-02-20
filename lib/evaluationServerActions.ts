import axios from "axios"

export const getAllEvaluation = ()=>axios.get('http://127.0.0.1:8000/evaluations_perso').then(res=>res.data)
export const createEvaluation = (data)=>axios.post('http://127.0.0.1:8000/evaluations', data).then(res=>res.data)
export const editEvaluation = (data, id)=>axios.patch(`http://127.0.0.1:8000/evaluations/${id}`, data).then(res=>res.data)
export const deleteEvaluation = (id)=>axios.delete(`http://127.0.0.1:8000/evaluations/${id}`).then(res=>res.data)
export const getModuleEvaluation = (module)=>axios.get(`http://127.0.0.1:8000/etudiants/module/${module}`).then(res=>res.data)
