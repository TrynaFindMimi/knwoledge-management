import type { CasoTipo, CasoEstado } from '../types'

export interface CasoEntidad {
  id: string
  cliente: string
  tipo: CasoTipo
  estado: CasoEstado
  proximaAudiencia?: string
  docs: number
}

export const casoEstados = {
  activo: { label: 'Activo', color: 'success' },
  'en audiencia': { label: 'En audiencia', color: 'warning' },
  cerrado: { label: 'Cerrado', color: 'default' },
} as const

const transicionesValidas: Record<CasoEstado, CasoEstado[]> = {
  activo: ['en audiencia', 'cerrado'],
  'en audiencia': ['activo', 'cerrado'],
  cerrado: [],
}

export function esTransicionEstadoValida(desde: CasoEstado, hacia: CasoEstado): boolean {
  return transicionesValidas[desde]?.includes(hacia) ?? false
}

export function validarCaso(caso: Partial<CasoEntidad>): string[] {
  const errores: string[] = []
  if (!caso.cliente?.trim()) errores.push('Cliente es requerido')
  if (!caso.tipo) errores.push('Tipo es requerido')
  if (!caso.estado) errores.push('Estado es requerido')
  return errores
}