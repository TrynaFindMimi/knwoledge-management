
import { ragRepository } from '../repositories/RagRepositoryImpl'

export const RagApi = {
  busqueda: (q: string, filters: Record<string, unknown> = {}) =>
    ragRepository.buscar(q, filters).then((resultados) => ({ resultados })),
  chat: (pregunta: string) => ragRepository.preguntar(pregunta),
  upload: (casoId: string, file: File, onProgress?: (p: number) => void) =>
    ragRepository.subirDocumento(casoId, file, onProgress),
}