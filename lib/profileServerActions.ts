import axios from "axios";

export const editProfil = (id, data)=>axios.put('https://application-gestion-note-backend.onrender.com/edit-profile/'+id, data).then(res=>res.data)