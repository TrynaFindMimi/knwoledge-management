export interface AudienciaEntidad {
  id: string
  casoId: string
  fecha: string
  hora: string
  juzgado: string
  tipo: string
  checklist: { tenidos: string[]; faltantes: string[]; enTramite: string[] }
}

export function audienciaEstaLista(a: AudienciaEntidad): boolean {
  return a.checklist.faltantes.length === 0
}

export function audienciaResumen(a: AudienciaEntidad): string {
  return `${a.fecha} ${a.hora} — ${a.juzgado}`
}