import type { BusquedaResult, BusquedaFiltros } from '../types'

export interface RagRepository {
  buscar(query: string, filtros?: BusquedaFiltros): Promise<BusquedaResult[]>
  preguntar(pregunta: string): Promise<{ respuesta: string; citas: BusquedaResult[] }>
  subirDocumento(casoId: string, file: File, onProgress?: (p: number) => void): Promise<void>
}
