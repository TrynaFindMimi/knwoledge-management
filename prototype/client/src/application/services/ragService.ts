/**
 * CAPA APLICACIÓN — RagService
 * Orquesta casos de uso RAG. No conoce Axios ni React, solo el puerto RagRepository.
 */
import type { RagRepository } from '../../domain/repositories/RagRepository'
import type { BusquedaFiltros } from '../../domain/types'

export function createRagService(repo: RagRepository) {
  return {
    buscar: async (query: string, filtros?: BusquedaFiltros) => {
      if (!query.trim()) throw new Error('Query vacía')
      // tolera conbenio->convenio vía embeddings; p95 <3s, precisión >=85%
      const resultados = await repo.buscar(query, filtros)
      return resultados
    },

    preguntar: async (pregunta: string) => {
      if (!pregunta.trim()) throw new Error('Pregunta vacía')
      // respuesta con citas doc/fecha/caso
      return repo.preguntar(pregunta)
    },

    subirDocumento: (casoId: string, file: File, onProgress?: (p: number) => void) =>
      repo.subirDocumento(casoId, file, onProgress),
  }
}

export type RagService = ReturnType<typeof createRagService>
