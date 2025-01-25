import axios from "axios"

export const getAllUE = ()=>axios.get('http://127.0.0.1:8000/ue').then(res=>res.data)
export const createUE = (data)=>axios.post('http://127.0.0.1:8000/ue', data).then(res=>res.data)
export const editUE = (data, id)=>axios.patch(`http://127.0.0.1:8000/ue/${id}`, data).then(res=>res.data)
export const deleteUE = (id)=>axios.delete(`http://127.0.0.1:8000/ue/${id}`).then(res=>res.data)
