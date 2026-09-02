import type { Caso, CasoEstado } from '../types'
import type { PaginacionParams } from '../types'

export interface CasoFiltros extends PaginacionParams {
  cliente?: string
  tipo?: string
  estado?: CasoEstado
  audienciaDesde?: string
}

export interface CasoRepository {
  listar(filtros: CasoFiltros): Promise<Caso[]>
  obtenerPorId(id: string): Promise<Caso>
  crear(data: Partial<Caso>): Promise<Caso>
  cambiarEstado(id: string, estado: CasoEstado): Promise<void>
  crearUrgente(data: unknown): Promise<Caso>
}