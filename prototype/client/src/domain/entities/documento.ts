export type TipoContenido =
  | 'demanda'
  | 'contestacion'
  | 'informe psicologico'
  | 'certificado medico'
  | 'orden proteccion'
  | 'comprobante pago'
  | 'otro'

export interface DocumentoEntidad {
  id: string
  casoId: string
  nombreSistema: string
  tipoContenido: TipoContenido
  versionActual: number
  fechaCarga: string
  hash: string
}

export const tiposDocumento = [
  'demanda',
  'contestacion',
  'informe psicologico',
  'certificado medico',
  'orden proteccion',
  'comprobante pago',
  'otro',
] as const

export function esTipoDocumentoValido(t: string): t is TipoContenido {
  return (tiposDocumento as readonly string[]).includes(t)
}
