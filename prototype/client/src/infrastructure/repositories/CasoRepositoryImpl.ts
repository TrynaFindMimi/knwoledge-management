import type { CasoRepository, CasoFiltros } from '../../domain/repositories/CasoRepository'
import type { Caso } from '../../domain/types'
import { api } from '../api/client'

export class CasoRepositoryImpl implements CasoRepository {
  async listar(filtros: CasoFiltros): Promise<Caso[]> {
    const { data } = await api.get('/casos', { params: filtros })
    // Soporta respuesta paginada { data: Caso[] } o directa Caso[]
    return Array.isArray(data) ? data : (data.data ?? data.resultados ?? [])
  }

  async obtenerPorId(id: string): Promise<Caso> {
    const { data } = await api.get(`/casos/${id}`)
    return data
  }

  async crear(payload: Partial<Caso>): Promise<Caso> {
    const { data } = await api.post('/casos', payload)
    return data
  }

  async cambiarEstado(id: string, estado: string): Promise<void> {
    await api.post(`/casos/${id}/estado`, { estado })
  }

  async crearUrgente(payload: unknown): Promise<Caso> {
    const { data } = await api.post('/casos/urgente', payload)
    return data
  }
}

export const casoRepository = new CasoRepositoryImpl()
