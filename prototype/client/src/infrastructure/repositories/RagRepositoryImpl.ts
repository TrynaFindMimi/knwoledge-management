import type { RagRepository } from '../../domain/repositories/RagRepository'
import type { BusquedaResult, BusquedaFiltros } from '../../domain/types'
import { api } from '../api/client'

export class RagRepositoryImpl implements RagRepository {
  async buscar(query: string, filtros: BusquedaFiltros = {}): Promise<BusquedaResult[]> {
    const { data } = await api.get('/busqueda', { params: { q: query, ...filtros } })
    return data.resultados ?? data.data ?? data
  }

  async preguntar(pregunta: string): Promise<{ respuesta: string; citas: BusquedaResult[] }> {
    const { data } = await api.post('/chat', { pregunta })
    return data
  }

  async subirDocumento(casoId: string, file: File, onProgress?: (p: number) => void): Promise<void> {
    const fd = new FormData()
    fd.append('file', file)
    await api.post(`/casos/${casoId}/documentos`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (e) => {
        if (e.progress != null) onProgress?.(Math.round(e.progress * 100))
        else if (e.loaded && e.total) onProgress?.(Math.round((e.loaded / e.total) * 100))
      },
    })
  }
}

export const ragRepository = new RagRepositoryImpl()