# ÍNDICE GENERAL

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG PARA EL BUFFET DE ABOGADOS DE ASISTENCIA FAMILIAR

---

## 1. DOCUMENTOS DE ENTRADA (Investigación)

| # | Documento | Ubicación | Descripción |
|---|-----------|-----------|-------------|
| 1.1 | Entrevista Abogado #01 | `entrevistas/Entrevista_Abogado_01.md` | Abogado varón, 12 años experiencia, asistencia familiar. Duración: 52 min |
| 1.2 | Entrevista Abogado #02 | `entrevistas/Entrevista_Abogado_02.md` | Abogada mujer, 8 años experiencia, patria potestad y menores. Duración: 48 min |
| 1.3 | Entrevista Abogado #03 | `entrevistas/Entrevista_Abogado_03.md` | Abogada mujer, 3 años experiencia, violencia doméstica. Duración: 35 min |
| 1.4 | Diagrama de Ishikawa | `diagramas/Ishikawa.md` | Análisis de causa raíz — 6 categorías, 24 causas identificadas |

---

## 2. DOCUMENTOS DE ANÁLISIS (Requerimientos)

| # | Documento | Ubicación | Contenido |
|---|-----------|-----------|-----------|
| 2.1 | Matriz de Coherencia | `documentos/Matriz_de_Coherencia.md` | Pregunta de investigación, objetivo general y 6 objetivos específicos |
| 2.2 | Términos de Referencia (TDR) | `documentos/TDR.md` | 29 requerimientos funcionales + 19 no funcionales, cada uno con ID, prioridad, criterios de aceptación |

---

## 3. DOCUMENTOS DE DISEÑO (Especificación)

| # | Documento | Ubicación | Contenido |
|---|-----------|-----------|-----------|
| 3.1 | User Stories | `documentos/User_Stories.md` | 30 historias de usuario organizadas en 10 épicas, con criterios de aceptación INVEST |
| 3.2 | Ciclo de Vida del Proyecto | `documentos/Ciclo_de_Vida_del_Proyecto.md` | 6 fases: Investigación → Diseño → Desarrollo → Pruebas → Despliegue → Mantenimiento |
| 3.3 | Modelado de Procesos BPWin | `documentos/Modelado_Procesos_BPWin.md` | 7 procesos modelados con flujos de actividades, 23 reglas de negocio, modelo de datos |

---

## 4. MAPA DE RELACIÓN DOCUMENTOS ↔ OBJETIVOS

| Objetivo | TDR | User Stories | BPWin |
|----------|-----|--------------|-------|
| **OE1.** Búsqueda semántica con RAG | RF-12, RF-13, RF-14 | US-12, US-13, US-14, US-25 | P3 (Búsqueda) |
| **OE2.** Clasificación automática | RF-05, RF-06, RF-08, RF-09 | US-05, US-06, US-08, US-09 | P1 (Registro), P2 (Ingesta) |
| **OE3.** Alertas proactivas | RF-15, RF-16, RF-17, RF-21, RF-22 | US-15, US-16, US-17, US-21, US-22 | P4 (Audiencias), P7 (Alertas) |
| **OE4.** Plataforma segura y móvil | RF-01, RF-02, RF-03, RF-04, RF-24 | US-01, US-02, US-03, US-24 | Todos (seguridad transversal) |
| **OE5.** Control de versiones | RF-10, RF-11, RF-29 | US-10, US-11, US-29 | P6 (Versiones) |
| **OE6.** Compartición segura | RF-18, RF-19, RF-20 | US-18, US-19, US-20 | P5 (Compartición) |

---

## 5. MAPA DE RELACIÓN ENTREVISTAS ↔ REQUERIMIENTOS

| Necesidad (Entrevista) | RF Asociados | Prioridad |
|------------------------|--------------|-----------|
| "Que me entienda aunque escriba mal" | RF-12, RF-13 | Crítica |
| "Que lea y clasifique solo" | RF-09 | Crítica |
| "Que me avise si vence la orden" | RF-16 | Crítica |
| "Seguridad para datos de víctimas" | RF-03 | Crítica |
| "Acceso desde celular en juzgado" | RF-24 | Alta |
| "Que no dependa de Mariela" | RF-05, RF-06, RF-14 | Alta |
| "No imprimir versión vieja" | RF-11 | Alta |
| "Enlace temporal, no WhatsApp" | RF-18, RF-19 | Alta |
| "Que sea fácil sin capacitación" | RF-24, RF-25 | Alta |
| "Rapidez en emergencias" | RF-25 | Alta |

---

## 6. FLUJO DEL PROYECTO

```
Entrevistas (3)          →  Análisis de Necesidades
         ↓
Matriz de Coherencia     →  Alineación Objetivos
         ↓
Diagrama Ishikawa        →  Causa Raíz del Problema
         ↓
TDR                      →  48 Requerimientos (29 RF + 19 RNF)
         ↓
User Stories             →  30 Historias de Usuario (10 Épicas)
         ↓
Modelado BPWin           →  7 Procesos + Modelo de Datos
         ↓
Ciclo de Vida            →  6 Fases del Proyecto
```

---

*Índice actualizado el 25/08/2026*
