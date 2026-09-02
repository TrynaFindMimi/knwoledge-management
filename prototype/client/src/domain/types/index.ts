export type CasoTipo = 'asistencia' | 'patria' | 'violencia' | 'otro'
export type CasoEstado = 'activo' | 'en audiencia' | 'cerrado'

export type { CasoEntidad as Caso } from '../entities/caso'
export type { DocumentoEntidad as Documento } from '../entities/documento'
export type { AudienciaEntidad as Audiencia } from '../entities/audiencia'

export interface BusquedaResult {
  documentoId: string
  titulo: string
  snippet: string
  score: number
  fuente: { caso: string; fecha: string }
}

export interface BusquedaFiltros {
  tipo?: string
  casoId?: string
  fechaDesde?: string
  fechaHasta?: string
}

export interface PaginacionParams {
  page?: number
  pageSize?: number
  sort?: string
}

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'abogado' | 'asistente'
  estado: 'activo' | 'inactivo'
}