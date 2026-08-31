import type { AudienciaEntidad } from '../entities/audiencia'

export interface AudienciaRepository {
  listar(params?: Record<string, unknown>): Promise<AudienciaEntidad[]>
  crear(data: Partial<AudienciaEntidad>): Promise<AudienciaEntidad>
  obtenerChecklist(id: string): Promise<AudienciaEntidad>
  descargarPaquete(id: string): Promise<Blob>
}
