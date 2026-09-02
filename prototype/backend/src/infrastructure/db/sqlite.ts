import { DatabaseSync } from 'node:sqlite'
import { mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '../../../../data')
const DB_PATH = process.env.SQLITE_PATH || join(DATA_DIR, 'km.sqlite')

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })

export const db = new DatabaseSync(DB_PATH)

export function initSqlite() {
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS usuarios (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      rol TEXT NOT NULL CHECK(rol IN ('admin','abogado','asistente')),
      estado TEXT NOT NULL DEFAULT 'activo',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS casos (
      id TEXT PRIMARY KEY,
      codigo TEXT UNIQUE NOT NULL,
      titulo TEXT NOT NULL,
      cliente TEXT NOT NULL,
      tipo TEXT NOT NULL CHECK(tipo IN ('asistencia','patria','violencia','otro')),
      estado TEXT NOT NULL DEFAULT 'activo' CHECK(estado IN ('activo','en audiencia','cerrado')),
      descripcion TEXT,
      creadoPor TEXT NOT NULL REFERENCES usuarios(id),
      asignados TEXT NOT NULL DEFAULT '[]',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS documentos (
      id TEXT PRIMARY KEY,
      casoId TEXT NOT NULL REFERENCES casos(id) ON DELETE CASCADE,
      titulo TEXT NOT NULL,
      tituloOriginal TEXT,
      tipo TEXT NOT NULL DEFAULT 'otro',
      mime TEXT,
      size INTEGER,
      ruta TEXT,
      version INTEGER NOT NULL DEFAULT 1,
      hash TEXT,
      estado TEXT NOT NULL DEFAULT 'procesado',
      embedding INTEGER DEFAULT 0,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chunks (
      id TEXT PRIMARY KEY,
      documentoId TEXT NOT NULL REFERENCES documentos(id) ON DELETE CASCADE,
      casoId TEXT NOT NULL,
      contenido TEXT NOT NULL,
      orden INTEGER NOT NULL,
      embedding TEXT,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audiencias (
      id TEXT PRIMARY KEY,
      casoId TEXT NOT NULL REFERENCES casos(id) ON DELETE CASCADE,
      titulo TEXT NOT NULL,
      fecha TEXT NOT NULL,
      hora TEXT NOT NULL,
      juzgado TEXT NOT NULL,
      tipo TEXT NOT NULL,
      estado TEXT NOT NULL DEFAULT 'programada',
      checklist TEXT NOT NULL DEFAULT '[]',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS notificaciones (
      id TEXT PRIMARY KEY,
      usuarioId TEXT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      tipo TEXT NOT NULL,
      titulo TEXT NOT NULL,
      mensaje TEXT NOT NULL,
      leida INTEGER NOT NULL DEFAULT 0,
      meta TEXT,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS compartir (
      id TEXT PRIMARY KEY,
      documentoId TEXT REFERENCES documentos(id) ON DELETE CASCADE,
      casoId TEXT,
      token TEXT UNIQUE NOT NULL,
      expiracion TEXT NOT NULL,
      singleUse INTEGER NOT NULL DEFAULT 1,
      usado INTEGER NOT NULL DEFAULT 0,
      permisos TEXT NOT NULL DEFAULT 'lectura',
      creadoPor TEXT NOT NULL REFERENCES usuarios(id),
      destinatario TEXT,
      watermark TEXT,
      createdAt TEXT NOT NULL,
      revoked INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS auditoria (
      id TEXT PRIMARY KEY,
      usuarioId TEXT,
      accion TEXT NOT NULL,
      recurso TEXT NOT NULL,
      detalle TEXT,
      ip TEXT,
      hash TEXT,
      prevHash TEXT,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chat_sessions (
      id TEXT PRIMARY KEY,
      usuarioId TEXT REFERENCES usuarios(id),
      titulo TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS chat_mensajes (
      id TEXT PRIMARY KEY,
      sessionId TEXT NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
      rol TEXT NOT NULL CHECK(rol IN ('user','assistant')),
      contenido TEXT NOT NULL,
      citas TEXT,
      createdAt TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_casos_estado ON casos(estado);
    CREATE INDEX IF NOT EXISTS idx_casos_tipo ON casos(tipo);
    CREATE INDEX IF NOT EXISTS idx_docs_caso ON documentos(casoId);
    CREATE INDEX IF NOT EXISTS idx_chunks_doc ON chunks(documentoId);
    CREATE INDEX IF NOT EXISTS idx_audiencias_fecha ON audiencias(fecha);
    CREATE INDEX IF NOT EXISTS idx_notif_usuario ON notificaciones(usuarioId);
  `)
  console.log(`[SQL] SQLite listo en ${DB_PATH}`)
}

export function query(sql: string, params: any[] = []) {
  return db.prepare(sql).all(...params) as any[]
}
export function get(sql: string, params: any[] = []) {
  return db.prepare(sql).get(...params) as any
}
export function run(sql: string, params: any[] = []) {
  return db.prepare(sql).run(...params)
}