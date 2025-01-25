import axios from "axios"

export const getAllNiveau = ()=>axios.get('http://127.0.0.1:8000/niveau').then(res=>res.data)
export const createNiveau = (data)=>axios.post('http://127.0.0.1:8000/niveau', data).then(res=>res.data)
export const editNiveau = (data, id)=>axios.patch(`http://127.0.0.1:8000/niveau/${id}`, data).then(res=>res.data)
export const deleteNiveau = (id)=>axios.delete(`http://127.0.0.1:8000/niveau/${id}`).then(res=>res.data)
