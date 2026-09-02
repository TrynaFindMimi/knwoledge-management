
import { audienciaRepository } from '../repositories/AudienciaRepositoryImpl'

export const AudienciasApi = {
  list: (params: Record<string, unknown>) => audienciaRepository.listar(params).then((data) => data),
  create: (data: unknown) => audienciaRepository.crear(data as never),
  checklist: (id: string) => audienciaRepository.obtenerChecklist(id),
  paquete: (id: string) => audienciaRepository.descargarPaquete(id).then((blob) => ({ data: blob })),
}