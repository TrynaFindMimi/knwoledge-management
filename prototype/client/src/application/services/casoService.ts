/**
 * CAPA APLICACIÓN — CasoService
 * Depende SOLO de puertos del dominio (CasoRepository), nunca de infraestructura concreta.
 * Inversión de dependencias: la implementación se inyecta desde composition root.
 */
import type { CasoRepository, CasoFiltros } from '../../domain/repositories/CasoRepository'
import type { Caso, CasoEstado } from '../../domain/types'
import { esTransicionEstadoValida } from '../../domain/entities/caso'

export function createCasoService(repo: CasoRepository) {
  return {
    listar: (filtros: CasoFiltros): Promise<Caso[]> => repo.listar(filtros),

    crear: (data: Partial<Caso>): Promise<Caso> => {
      if (!data.cliente?.trim()) return Promise.reject(new Error('Cliente es requerido'))
      if (!data.tipo) return Promise.reject(new Error('Tipo es requerido'))
      return repo.crear(data)
    },

    cambiarEstado: async (id: string, estado: CasoEstado, estadoActual?: CasoEstado): Promise<void> => {
      if (estadoActual && !esTransicionEstadoValida(estadoActual, estado)) {
        throw new Error(`Transición no válida: ${estadoActual} → ${estado}`)
      }
      return repo.cambiarEstado(id, estado)
    },

    obtener: (id: string): Promise<Caso> => repo.obtenerPorId(id),
  }
}

export type CasoService = ReturnType<typeof createCasoService>
