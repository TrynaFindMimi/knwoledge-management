
import type { RagRepository } from '../../domain/repositories/RagRepository'
import type { BusquedaFiltros } from '../../domain/types'

export function createRagService(repo: RagRepository) {
  return {
    buscar: async (query: string, filtros?: BusquedaFiltros) => {
      if (!query.trim()) throw new Error('Query vacía')
      const resultados = await repo.buscar(query, filtros)
      return resultados
    },

    preguntar: async (pregunta: string) => {
      if (!pregunta.trim()) throw new Error('Pregunta vacía')
      return repo.preguntar(pregunta)
    },

    subirDocumento: (casoId: string, file: File, onProgress?: (p: number) => void) =>
      repo.subirDocumento(casoId, file, onProgress),
  }
}

export type RagService = ReturnType<typeof createRagService>