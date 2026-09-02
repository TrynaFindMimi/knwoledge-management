import { mkdirSync, existsSync, writeFileSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'

const __dir = dirname(fileURLToPath(import.meta.url))
export const UPLOAD_DIR = join(__dir, '../../../../data/uploads')

export function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true })
}

export async function saveFile(buffer: Buffer, originalName: string): Promise<{ ruta: string; filename: string }> {
  ensureUploadDir()
  const ext = originalName.split('.').pop() || 'bin'
  const filename = `${randomUUID()}.${ext}`
  const ruta = join(UPLOAD_DIR, filename)
  writeFileSync(ruta, buffer)
  return { ruta, filename }
}

export function readFile(ruta: string): Buffer | null {
  try { return readFileSync(ruta) } catch { return null }
}

export const ALLOWED_MIME = ['application/pdf','image/jpeg','image/png','image/jpg','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/msword','text/plain']
export const ALLOWED_EXT = ['pdf','jpg','jpeg','png','docx','doc','txt']

export function isAllowed(filename: string, mime?: string): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  if (ALLOWED_EXT.includes(ext)) return true
  if (mime && ALLOWED_MIME.includes(mime)) return true
  return false
}

export function classifyByContent(name: string, textPreview: string): { tipo: string; nuevoNombre: string } {
  const low = (name + ' ' + textPreview).toLowerCase()
  let tipo = 'otro'
  if (low.includes('demanda')) tipo = 'demanda'
  else if (low.includes('contestacion')) tipo = 'contestacion'
  else if (low.includes('psicolog')) tipo = 'informe psicologico'
  else if (low.includes('medico') || low.includes('certificado')) tipo = 'certificado medico'
  else if (low.includes('proteccion') || low.includes('medida')) tipo = 'orden proteccion'
  else if (low.includes('comprobante') || low.includes('pago') || low.includes('deposito')) tipo = 'comprobante pago'
  else if (low.includes('convenio') || low.includes('acuerdo')) tipo = 'convenio'

  let nuevoNombre = name
  if (/^scan\d+/i.test(name) || /^img_\d+/i.test(name) || name.length < 6) {
    const fecha = new Date().toISOString().slice(0,10)
    nuevoNombre = `${tipo.replace(/\s+/g,'_')}_${fecha}_${Math.random().toString(36).slice(2,6)}.${name.split('.').pop()}`
  }
  return { tipo, nuevoNombre }
}