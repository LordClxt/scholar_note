import axios from "axios";

export const editProfil = (id, data)=>axios.put('http://127.0.0.1:8000/edit-profile/'+id, data).then(res=>res.data)