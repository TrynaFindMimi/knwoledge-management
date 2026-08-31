/**
 * CAPA APLICACIÓN — AudienciaService (depende solo de puerto dominio)
 */
import type { AudienciaRepository } from '../../domain/repositories/AudienciaRepository'
import type { AudienciaEntidad } from '../../domain/entities/audiencia'

export function createAudienciaService(repo: AudienciaRepository) {
  return {
    listar: (params?: Record<string, unknown>): Promise<AudienciaEntidad[]> => repo.listar(params),
    obtenerChecklist: (id: string) => repo.obtenerChecklist(id),
    crear: (data: Partial<AudienciaEntidad>) => repo.crear(data),
    descargarPaquete: (id: string) => repo.descargarPaquete(id),
  }
}

export type AudienciaService = ReturnType<typeof createAudienciaService>
