import axios from "axios"

export const getAllPeriode = ()=>axios.get('http://127.0.0.1:8000/periodes').then(res=>res.data)
export const createPeriode = (data)=>axios.post('http://127.0.0.1:8000/periodes', data).then(res=>res.data)
export const editPeriode = (data, id)=>axios.patch(`http://127.0.0.1:8000/periodes/${id}`, data).then(res=>res.data)
export const deletePeriode = (id)=>axios.delete(`http://127.0.0.1:8000/periodes/${id}`).then(res=>res.data)
