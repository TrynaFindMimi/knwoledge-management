import { useQuery } from '@tanstack/react-query'
import { services } from '../../composition/container'
import type { BusquedaFiltros } from '../../domain/types'

export const useBusqueda = (q: string, filtros?: BusquedaFiltros) =>
  useQuery({
    queryKey: ['busqueda', q, filtros],
    queryFn: () => services.rag.buscar(q, filtros),
    enabled: !!q.trim(),
    staleTime: 30_000,
  })