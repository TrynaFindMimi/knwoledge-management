/**
 * Composition Root — único lugar donde application conoce infraestructura concreta.
 * Presentation y Application nunca importan `*RepositoryImpl` directamente;
 * consumen esta instancia ya cableada.
 */
import { casoRepository } from '../repositories/CasoRepositoryImpl'
import { ragRepository } from '../repositories/RagRepositoryImpl'
import { audienciaRepository } from '../repositories/AudienciaRepositoryImpl'
import { authRepository } from '../repositories/AuthRepositoryImpl'

import { createCasoService } from '../../application/services/casoService'
import { createRagService } from '../../application/services/ragService'
import { createAudienciaService } from '../../application/services/audienciaService'
import { createAuthService } from '../../application/services/authService'

// Repositorios (puertos implementados)
export const repositories = {
  caso: casoRepository,
  rag: ragRepository,
  audiencia: audienciaRepository,
  auth: authRepository,
} as const

// Servicios de aplicación cableados (inyección por factory)
export const services = {
  caso: createCasoService(repositories.caso),
  rag: createRagService(repositories.rag),
  audiencia: createAudienciaService(repositories.audiencia),
  auth: createAuthService(repositories.auth),
} as const
