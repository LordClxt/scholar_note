import axios from "axios"

export const getAllFiliereModule = ()=>axios.get('http://127.0.0.1:8000/filiere_module').then(res=>res.data)
export const createFiliereModule = (data)=>axios.post('http://127.0.0.1:8000/filiere_module', data).then(res=>res.data)
export const editFiliereModule = (data, id)=>axios.patch(`http://127.0.0.1:8000/filiere_module/${id}`, data).then(res=>res.data)
export const deleteFiliereModule = (id)=>axios.delete(`http://127.0.0.1:8000/filiere_module/${id}`).then(res=>res.data)

export const getAllFiliereByModule = (id)=>axios.get('http://127.0.0.1:8000/filiere_module/module/'+id).then(res=>res.data)

