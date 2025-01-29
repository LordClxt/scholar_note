import axios from "axios"

export const getAllEnseignant = ()=>axios.get('http://127.0.0.1:8000/enseignants').then(res=>res.data)
export const createEnseignant = (data)=>axios.post('http://127.0.0.1:8000/auth/enseignant/inscription', data).then(res=>res.data)
export const editEnseignant = (data, id)=>axios.patch(`http://127.0.0.1:8000/enseignants/${id}`, data).then(res=>res.data)
export const deleteEnseignant = (id)=>axios.delete(`http://127.0.0.1:8000/enseignants/${id}`).then(res=>res.data)
