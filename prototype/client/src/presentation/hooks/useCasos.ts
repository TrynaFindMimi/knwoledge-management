/**
 * CAPA PRESENTACIÓN — hooks de vista
 * Única capa autorizada a conocer React Query y a cablear servicios
 * via DI container (presentation -> application + infrastructure/di).
 * Application permanece pura (no importa infraestructura).
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { services } from '../../composition/container'
import type { CasoFiltros } from '../../domain/repositories/CasoRepository'

export const useCasos = (filters: CasoFiltros) =>
  useQuery({ queryKey: ['casos', filters], queryFn: () => services.caso.listar(filters) })

export const useCreateCaso = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Parameters<typeof services.caso.crear>[0]) => services.caso.crear(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['casos'] }),
  })
}

export const useCambiarEstadoCaso = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, estado }: { id: string; estado: string }) =>
      services.caso.cambiarEstado(id, estado as never),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['casos'] }),
  })
}
