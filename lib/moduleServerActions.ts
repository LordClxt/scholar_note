import axios from "axios"

export const getAllModule = ()=>axios.get('http://127.0.0.1:8000/modules').then(res=>res.data)
export const getModule = (module)=>axios.get('http://127.0.0.1:8000/modules/'+module).then(res=>res.data)
export const createModule = (data)=>axios.post('http://127.0.0.1:8000/modules', data).then(res=>res.data)
export const editModule = (data, id)=>axios.patch(`http://127.0.0.1:8000/modules/${id}`, data).then(res=>res.data)
export const deleteModule = (id)=>axios.delete(`http://127.0.0.1:8000/modules/${id}`).then(res=>res.data)
