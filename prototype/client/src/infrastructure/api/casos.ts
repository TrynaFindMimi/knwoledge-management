/**
 * @deprecated Usar domain/repositories/CasoRepository + infrastructure/repositories/CasoRepositoryImpl.
 * Se mantiene temporalmente para compatibilidad hasta migrar todos los consumidores.
 */
import { casoRepository } from '../repositories/CasoRepositoryImpl'

export const CasosApi = {
  list: (params: unknown) => casoRepository.listar(params as never).then((data) => data),
  create: (data: unknown) => casoRepository.crear(data as never),
  get: (id: string) => casoRepository.obtenerPorId(id),
  changeEstado: (id: string, estado: string) => casoRepository.cambiarEstado(id, estado as never),
  urgente: (data: unknown) => casoRepository.crearUrgente(data),
}
