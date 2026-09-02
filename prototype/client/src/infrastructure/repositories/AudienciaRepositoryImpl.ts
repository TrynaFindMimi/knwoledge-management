import type { AudienciaRepository } from '../../domain/repositories/AudienciaRepository'
import type { AudienciaEntidad } from '../../domain/entities/audiencia'
import { api } from '../api/client'

export class AudienciaRepositoryImpl implements AudienciaRepository {
  async listar(params: Record<string, unknown> = {}): Promise<AudienciaEntidad[]> {
    const { data } = await api.get('/audiencias', { params })
    return Array.isArray(data) ? data : (data.data ?? [])
  }

  async crear(payload: Partial<AudienciaEntidad>): Promise<AudienciaEntidad> {
    const { data } = await api.post('/audiencias', payload)
    return data
  }

  async obtenerChecklist(id: string): Promise<AudienciaEntidad> {
    const { data } = await api.get(`/audiencias/${id}`)
    return data
  }

  async descargarPaquete(id: string): Promise<Blob> {
    const { data } = await api.get(`/audiencias/${id}/paquete.pdf`, { responseType: 'blob' })
    return data as Blob
  }
}

export const audienciaRepository = new AudienciaRepositoryImpl()