# MATRIZ DE COEFICIENTES DE EVALUACIÓN

## SISTEMA DE GESTIÓN DE CONOCIMIENTO (KM) CON RAG — BUFFET DE ASISTENCIA FAMILIAR

### EQUIPO DE TRABAJO

| # | Nombre |
|---|--------|
| 1 | Nahomi Humerez |
| 2 | Mariana del Arroyo |
| 3 | Santiago Acha |
| 4 | Jorge Saenz |

---

### 1. OBJETO DE LA MATRIZ

Esta matriz establece de forma objetiva, ponderada y trazable cómo se evaluarán y calificarán las propuestas técnicas y económicas presentadas para el proyecto. Permite obtener un puntaje final ponderado (0–100) por proponente, garantizando transparencia y comparabilidad.

Fórmula general: Puntaje Final (PF) = Σ (Ci × Pi), donde Ci = coeficiente de ponderación del criterio i (0,00–1,00), Pi = puntaje obtenido en el criterio i (0–100), ΣCi = 1,00 (100%). Puntaje mínimo de habilitación: 70/100. Las propuestas por debajo de este umbral se descalifican.

---

### 2. MATRIZ PRINCIPAL — EVALUACIÓN DE PROPUESTAS

| Código | Criterio de Evaluación | Coef. (Ci) | Peso % | Subcriterios (desglose) | Puntaje Pi (0-100) | Puntaje Ponderado (Ci×Pi) |
|--------|------------------------|------------|--------|--------------------------|--------------------|---------------------------|
| **C1** | **Experiencia del equipo y portafolio** | **0.30** | 30% | C1.1 Portafolio de sistemas web/KM/RAG previos (40%)<br>C1.2 Experiencia comprobable del Ing. RAG/IA (30%)<br>C1.3 Referencias de clientes verificables (15%)<br>C1.4 Experiencia en sector legal/documental (15%) | 85 | 25.50 |
| **C2** | **Propuesta técnica y stack tecnológico** | **0.25** | 25% | C2.1 Arquitectura RAG completa (ingesta→OCR→chunking→embeddings→Vector DB→retriever→LLM) (35%)<br>C2.2 Stack propuesto (React, Node/Python, PostgreSQL+pgvector/Qdrant, LangChain) y justificación (20%)<br>C2.3 Estrategia anti-alucinación y citación con trazabilidad (20%)<br>C2.4 Seguridad, cifrado y escalabilidad 10k+ docs (15%)<br>C2.5 Plan de evaluación Precision@5 >85% (10%) | 90 | 22.50 |
| **C3** | **Propuesta económica** | **0.25** | 25% | C3.1 Relación costo-beneficio (50%)<br>C3.2 Desglose por hitos y coherencia con cronograma (30%)<br>C3.3 Costos de licencias/modelos incluidos vs. por cuenta del buffet (20%)<br>*Fórmula C3: Pi = (Precio menor ofertado / Precio ofertado) × 100* | 75 | 18.75 |
| **C4** | **Cronograma y metodología** | **0.15** | 15% | C4.1 Plan de 10 semanas con sprints Scrum y entregables E1-E11 (40%)<br>C4.2 Validación RAG con 50 preguntas reales Sprint 6 (30%)<br>C4.3 Gestión de riesgos y plan de mitigación (15%)<br>C4.4 Comunicación (Trello/Jira, WhatsApp, dailies) (15%) | 80 | 12.00 |
| **C5** | **Experiencia con sistemas legales/documentales** | **0.05** | 5% | C5.1 Proyectos previos en estudios jurídicos / sector justicia (60%)<br>C5.2 Conocimiento de normativa boliviana de protección de datos (40%) | 60 | 3.00 |
| | **TOTAL** | **1.00** | **100%** | | **PF = 81.75** | **81.75** |

---

### 3. ESCALA DE CALIFICACIÓN POR CRITERIO (Pi)

| Rango Pi | Calificación | Descripción |
|----------|--------------|-------------|
| 90 - 100 | Excelente | Supera lo exigido, evidencia sólida, propuesta innovadora y verificable |
| 75 - 89  | Bueno | Cumple plenamente, con evidencia suficiente |
| 60 - 74  | Regular | Cumple parcialmente, con observaciones subsanables |
| 40 - 59  | Deficiente | Cumple de forma insuficiente, sin evidencia clara |
| 0 - 39   | No cumple | No presenta información o no cumple el criterio |

**Regla de descalificación automática:** Si C1 < 40 o C2 < 40, la propuesta se descalifica aunque el PF sea ≥ 70 (criterios críticos).

---

### 4. EJEMPLO DE CÁLCULO (ilustrativo)

| Criterio | Ci | Proponente A (Pi) | A Ponderado | Proponente B (Pi) | B Ponderado |
|----------|----|-------------------|-------------|-------------------|-------------|
| C1 (30%) | 0.30 | 85 | 25.50 | 70 | 21.00 |
| C2 (25%) | 0.25 | 90 | 22.50 | 80 | 20.00 |
| C3 (25%) | 0.25 | 75 | 18.75 | 95 | 23.75 |
| C4 (15%) | 0.15 | 80 | 12.00 | 65 | 9.75 |
| C5 (5%)  | 0.05 | 60 | 3.00 | 90 | 4.50 |
| **PF** | 1.00 | | **81.75** | | **79.00** |

---

### 5. MATRIZ SECUNDARIA — COEFICIENTES DE PRIORIZACIÓN DE REQUERIMIENTOS FUNCIONALES

Permite priorizar el backlog y definir el contenido de cada sprint. Coeficiente de Valor (CV) de 1 a 5 y Coeficiente de Esfuerzo (CE) de 1 a 5. Ratio Valor/Esfuerzo = CV/CE.

| Req. | Funcionalidad | Prioridad TDR | Coef. Valor (CV) | Coef. Esfuerzo (CE) | Ratio Valor/Esfuerzo | Sprint sugerido |
|------|---------------|---------------|-----------------|---------------------|----------------------|-----------------|
| F01 | Autenticación y roles | Alta | 5 | 2 | 2.50 | 3 |
| F02 | CRUD de casos | Alta | 5 | 2 | 2.50 | 4 |
| F03 | Subida con drag&drop + OCR | Alta | 5 | 4 | 1.25 | 5 |
| F04 | Organización por caso/categoría | Alta | 4 | 2 | 2.00 | 5 |
| F05 | Búsqueda avanzada + filtros | Alta | 5 | 3 | 1.67 | 5-6 |
| F06 | Control de versiones | Alta | 4 | 3 | 1.33 | 7 |
| F07 | Alertas inteligentes (extraídas del contenido) | Alta | 5 | 3 | 1.67 | 7 |
| F17 | Pipeline RAG (chunking+embeddings+Vector DB) | Alta | 5 | 5 | 1.00 | 5-6 |
| F18 | Chat KM con citas y anti-alucinación | Alta | 5 | 5 | 1.00 | 7 |
| F19 | Clasificación automática por LLM | Alta | 5 | 4 | 1.25 | 6 |
| F20 | Filtros inteligentes vía RAG | Alta | 4 | 4 | 1.00 | 7 |
| F21 | Auditoría y trazabilidad RAG | Alta | 4 | 3 | 1.33 | 8-9 |
| F08 | Notificaciones por correo | Media | 3 | 2 | 1.50 | 7 |
| F09 | Generación de documentos con plantillas | Media | 3 | 3 | 1.00 | 8 |
| F10 | Compartir con enlaces seguros | Media | 3 | 2 | 1.50 | 8 |
| F11 | Panel de administración | Alta | 4 | 3 | 1.33 | 9 |
| F12 | Respaldo automático (relacional+vectorial) | Alta | 4 | 2 | 2.00 | 9 |
| F13 | Dashboard casos/alertas | Alta | 4 | 2 | 2.00 | 9 |
| F14 | Etiquetas y marcadores | Baja | 2 | 1 | 2.00 | 9 |
| F15 | Comentarios colaborativos | Baja | 2 | 2 | 1.00 | 10 |
| F16 | Exportación de reportes | Baja | 2 | 2 | 1.00 | 10 |

---

### 6. MATRIZ DE COEFICIENTES DE RIESGO (Probabilidad × Impacto)

Para priorizar mitigación. Coeficiente de Riesgo (CR) = P × I.

| # | Riesgo | Prob. (P) 1-5 | Impacto (I) 1-5 | CR (P×I) | Nivel | Mitigación con RAG/KM |
|---|--------|---------------|-----------------|----------|-------|------------------------|
| R1 | Alucinación del LLM (>5%) | 3 | 5 | **15** | Alto | Threshold 0.75, prompt anti-alucinación, citas obligatorias |
| R2 | OCR falla en manuscritos | 4 | 4 | **16** | Alto | Doble motor Tesseract + Textract, validación humana |
| R3 | Embeddings malos para español legal boliviano | 3 | 4 | **12** | Medio | Usar BGE-M3 / Cohere multilingual-v3, fine-tuning |
| R4 | Vector DB no escala a 10k docs | 2 | 4 | **8** | Medio | pgvector con índices HNSW, particionado por caso |
| R5 | Resistencia al cambio de abogados | 4 | 3 | **12** | Medio | Chat tipo WhatsApp, capacitación prompts naturales |
| R6 | Filtración de datos sensibles | 2 | 5 | **10** | Alto | Cifrado en reposo/tránsito, control a nivel de chunk |
| R7 | Retraso en cronograma 10 semanas | 3 | 3 | **9** | Medio | Scrum 2 semanas, demos, backlog priorizado por CV |

---

### 7. REFERENCIAS CRUZADAS

- **TDR:** Sección 15 (Criterios de Evaluación) — esta matriz es el **Anexo A** del TDR.
- **Contrato:** Cláusula Décima Quinta / Criterios de calidad — la matriz rige la adjudicación.
- **Ishikawa:** Los coeficientes C2 y C1 ponderan la causa raíz TECNOLOGÍA (Sin RAG) como crítica.
- **Evaluación RAG:** RNF11 (Precision@5 >85%) se evalúa dentro de C2.2 y C2.5.
