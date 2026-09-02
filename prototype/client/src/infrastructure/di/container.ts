
import { casoRepository } from '../repositories/CasoRepositoryImpl'
import { ragRepository } from '../repositories/RagRepositoryImpl'
import { audienciaRepository } from '../repositories/AudienciaRepositoryImpl'
import { authRepository } from '../repositories/AuthRepositoryImpl'

import { createCasoService } from '../../application/services/casoService'
import { createRagService } from '../../application/services/ragService'
import { createAudienciaService } from '../../application/services/audienciaService'
import { createAuthService } from '../../application/services/authService'

export const repositories = {
  caso: casoRepository,
  rag: ragRepository,
  audiencia: audienciaRepository,
  auth: authRepository,
} as const

export const services = {
  caso: createCasoService(repositories.caso),
  rag: createRagService(repositories.rag),
  audiencia: createAudienciaService(repositories.audiencia),
  auth: createAuthService(repositories.auth),
} as const