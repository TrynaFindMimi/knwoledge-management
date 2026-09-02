import { randomUUID } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { db, initSqlite, run, query } from './sqlite.js'
import { nosql, initNosql } from './nosql.js'
import { vectorStore } from '../vector/localVector.js'

export async function seed() {
  initSqlite()
  initNosql()

  const existing = query('SELECT id FROM usuarios LIMIT 1')
  if (existing.length > 0) {
    console.log('[seed] Ya existe data, skip')
    return
  }

  const now = new Date().toISOString()
  const hash = await bcrypt.hash('Admin123!@#abc', 12)

  const adminId = randomUUID()
  const abogadoId = randomUUID()
  const asistenteId = randomUUID()

  run('INSERT INTO usuarios VALUES (?,?,?,?,?,?,?,?)', [adminId, 'Admin Buffet', 'admin@buffet.bo', hash, 'admin', 'activo', now, now])
  const hash2 = await bcrypt.hash('Abogado123!@#', 12)
  run('INSERT INTO usuarios VALUES (?,?,?,?,?,?,?,?)', [abogadoId, 'Maria Abogada', 'maria@buffet.bo', hash2, 'abogado', 'activo', now, now])
  const hash3 = await bcrypt.hash('Asist123!@#abc', 12)
  run('INSERT INTO usuarios VALUES (?,?,?,?,?,?,?,?)', [asistenteId, 'Carlos Asistente', 'carlos@buffet.bo', hash3, 'asistente', 'activo', now, now])

  const casos = [
    { id: randomUUID(), codigo: 'CASO-2024-MAM-001', titulo: 'Mamani - Asistencia Familiar', cliente: 'Mamani Quispe', tipo: 'asistencia', desc: 'Convenio transaccional visitas homologado' },
    { id: randomUUID(), codigo: 'CASO-2024-GAR-002', titulo: 'Garcia - Asistencia Familiar', cliente: 'Garcia Lopez', tipo: 'asistencia', desc: 'Audiencia manana, faltan certificados' },
    { id: randomUUID(), codigo: 'CASO-2024-ROJ-003', titulo: 'Rojas - Patria Potestad', cliente: 'Rojas Mamani', tipo: 'patria', desc: 'Patria potestad y guarda' },
  ]
  for (const c of casos) {
    run('INSERT INTO casos VALUES (?,?,?,?,?,?,?,?,?,?,?)', [c.id, c.codigo, c.titulo, c.cliente, c.tipo, 'activo', c.desc, adminId, JSON.stringify([abogadoId]), now, now])
  }

  const docs = [
    { casoId: casos[0].id, titulo: 'Convenio Transaccional - Mamani 2024-03-15', tipo: 'convenio', contenido: 'Convenio transaccional de asistencia familiar y regimen de visitas homologado el 15 de marzo de 2024 entre Mamani Quispe y contraparte. Monto 800 Bs mensuales. Juzgado Publico Familia 3 La Paz. Homologado.' },
    { casoId: casos[1].id, titulo: 'Informe Psicologico - Garcia 2024-08-28', tipo: 'informe psicologico', contenido: 'Informe psicologico familia Garcia realizado 28 agosto 2024. Evalua vinculo parental. Recomienda terapia. Certificado nacimiento pendiente. Informe favorable.' },
    { casoId: casos[1].id, titulo: 'Demanda Asistencia - Garcia', tipo: 'demanda', contenido: 'Demanda de asistencia familiar caso Garcia Lopez. Solicita 1200 Bs mensuales. Juzgado 2do Familia. Presentada enero 2024.' },
    { casoId: casos[2].id, titulo: 'Orden Proteccion - Rojas', tipo: 'orden proteccion', contenido: 'Orden de proteccion medida 180 dias caso Rojas vigencia hasta 2024-12-15 proteccion victima domicilio' },
    { casoId: casos[0].id, titulo: 'Comprobante Pago - Mamani Mayo', tipo: 'comprobante pago', contenido: 'Comprobante deposito 800 Bs Mamani mayo 2024 banco union' },
  ]
  for (const d of docs) {
    const id = randomUUID()
    run('INSERT INTO documentos VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [id, d.casoId, d.titulo, d.titulo, d.tipo, 'text/plain', d.contenido.length, '', 1, '', 'procesado', 1, now, now])
    const chunkId = randomUUID()
    run('INSERT INTO chunks VALUES (?,?,?,?,?,?,?)', [chunkId, id, d.casoId, d.contenido, 0, JSON.stringify(vectorStore.embed(d.contenido)), now])
    vectorStore.add({ id: chunkId, documentoId: id, casoId: d.casoId, titulo: d.titulo, contenido: d.contenido, tipo: d.tipo, fecha: now, embedding: vectorStore.embed(d.contenido) })
    await nosql.collection('documentos').insert({ _id: id, casoId: d.casoId, titulo: d.titulo, tipo: d.tipo, contenido: d.contenido, tags: [d.tipo], createdAt: now })
  }

  const tomorrow = new Date(Date.now() + 24*3600*1000).toISOString().slice(0,10)
  run('INSERT INTO audiencias VALUES (?,?,?,?,?,?,?,?,?,?,?)', [randomUUID(), casos[1].id, 'Audiencia Garcia - Prueba', tomorrow, '09:00', 'Juzgado 2do Familia La Paz', 'prueba', 'programada', JSON.stringify([{ item: 'Certificado nacimiento', estado: 'faltante' }, { item: 'Informe psicologico', estado: 'tenido' }, { item: 'Comprobante pago', estado: 'faltante' }]), now, now])
  run('INSERT INTO audiencias VALUES (?,?,?,?,?,?,?,?,?,?,?)', [randomUUID(), casos[0].id, 'Audiencia Mamani - Seguimiento', new Date(Date.now()+7*24*3600*1000).toISOString().slice(0,10), '14:30', 'Juzgado 3ro Familia', 'seguimiento', 'programada', JSON.stringify([{ item: 'Convenio homologado', estado: 'tenido' }]), now, now])

  run('INSERT INTO notificaciones VALUES (?,?,?,?,?,?,?,?)', [randomUUID(), abogadoId, 'audiencia', 'Audiencia Garcia manana 09:00', 'Juzgado 2do Familia - faltan 2 docs', 0, JSON.stringify({ casoId: casos[1].id }), now])

  console.log('[seed] Completo: 3 usuarios, 3 casos, 5 docs, 2 audiencias')
}

if (process.argv[1]?.endsWith('seed.ts')) {
  seed().then(()=> process.exit(0))
}