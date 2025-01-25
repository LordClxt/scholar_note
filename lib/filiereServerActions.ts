import axios from "axios"

export const getAllFiliere = ()=>axios.get('http://127.0.0.1:8000/filieres').then(res=>res.data)
export const createFiliere = (data)=>axios.post('http://127.0.0.1:8000/filieres', data).then(res=>res.data)
export const editFiliere = (data, id)=>axios.patch(`http://127.0.0.1:8000/filieres/${id}`, data).then(res=>res.data)
export const deleteFiliere = (id)=>axios.delete(`http://127.0.0.1:8000/filieres/${id}`).then(res=>res.data)
