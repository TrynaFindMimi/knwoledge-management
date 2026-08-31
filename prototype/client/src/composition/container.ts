/**
 * Composition Root — capa más externa (wiring).
 * Es el ÚNICO lugar que conoce tanto Application como Infrastructure.
 * Presentation importa desde aquí, no desde infrastructure/* directamente.
 * Así se respeta: Domain <- Application <- (Infrastructure, Presentation) <- Composition
 */
export { repositories, services } from '../infrastructure/di/container'
