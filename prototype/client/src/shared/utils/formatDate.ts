export const formatFecha = (iso:string)=> new Date(iso).toLocaleDateString('es-BO',{year:'numeric',month:'2-digit',day:'2-digit'})
export const formatHora = (iso:string)=> new Date(iso).toLocaleTimeString('es-BO',{hour:'2-digit',minute:'2-digit'})
