# 🦜 StudyBuddy English — PreK through Grade 12

Plataforma educativa de inglés para estudiantes panameños, construida con HTML/CSS/JS puro + Supabase.

---

## 📁 Estructura de archivos

```
studybuddy/
├── index.html          ← App completa (todo en un archivo)
├── manifest.json       ← PWA manifest
├── README.md           ← Este archivo
├── pre_k.json          ← Contenido PreK
├── K.json              ← Contenido Kinder
├── 1.json – 12.json    ← Contenido Grados 1–12
└── scope_sequence.json ← Mapa de alcance y secuencia
```

---

## 🚀 Deploy en GitHub Pages

1. Sube **todos** los archivos al repositorio
2. **Settings → Pages → Branch: main → Save**
3. URL: `https://TU-USUARIO.github.io/NOMBRE-REPO`

---

## 🗄️ Base de datos (Supabase)

Proyecto: `lsgnffjoqcbhjrleayvu.supabase.co`

### Tablas (prefijo `sb_`)
| Tabla | Descripción |
|---|---|
| `sb_teachers` | Docentes |
| `sb_classes` | Clases por docente |
| `sb_students` | Estudiantes |
| `sb_activity_results` | Puntajes por actividad |
| `sb_scenario_unlocks` | Escenarios desbloqueados |

### Funciones RPC
| Función | Descripción |
|---|---|
| `sb_student_login(username, pin)` | Autentica al estudiante |
| `sb_save_result(...)` | Guarda puntaje + detecta desbloqueos |
| `sb_get_student_progress(id, grade)` | Carga progreso del estudiante |
| `sb_teacher_dashboard(email, grade)` | Dashboard del docente |
| `sb_create_student(...)` | Crea un estudiante nuevo |

### Crear un estudiante (SQL Editor)
```sql
select sb_create_student(
  'docente@studybuddy.edu.pa',   -- email del docente
  (select id from sb_classes limit 1),  -- clase
  'María García',                -- nombre completo
  'maria.garcia',                -- username
  'maria01',                     -- PIN
  '4'                            -- grado asignado
);
```

---

## ⚙️ Funcionalidades

| Feature | Estado |
|---|---|
| 14 niveles (PreK–12) | ✅ |
| 5 habilidades por escenario | ✅ |
| Study Mode (vocabulario, gramática, pronunciación) | ✅ |
| Toggle EN / ES | ✅ |
| Mascota bilingüe (Orbit) | ✅ |
| Text-to-Speech (Web Speech API) | ✅ |
| Login con Supabase | ✅ |
| Progreso en la nube | ✅ |
| Modo offline + sync automático | ✅ |
| Modo invitado (sin cuenta) | ✅ |
| PWA instalable | ✅ |
| Contenido interactivo Grades 3–6 | ✅ |
| Slider fallback Grades 7–12 | ✅ (temporal) |

---

## 📊 Niveles CEFR

| Grado | CEFR | Enfoque |
|---|---|---|
| PreK | Pre-A1 | Colores, formas, palabras básicas |
| Kinder | Pre-A1 | Frases simples |
| 1–2 | A1.1–A1.2 | Oraciones simples |
| 3–4 | A1.1–A1.2 | Textos 50–120 palabras |
| 5–6 | A1.3–A2.1 | Textos medianos |
| 7–9 | A2.2–A2.4 | Narrativas y opiniones |
| 10–12 | B1.1–B1.3 | Inglés académico |

---

## 🔧 Agregar contenido interactivo (Grades 7–12)

Añade entradas al objeto `ACTIVITY_CONTENT` en `index.html`:

```js
"g7_s1_t1_listening": {
  "type": "listening",
  "sentences": ["Sentence 1.", "Sentence 2.", ...],
  "questions": [
    { "q": "Question?", "opts": ["A","B","C","D"], "ans": 0 }
  ]
}
```

**Clave del formato:** `g{grado}_s{escenario}_t{tema}__{habilidad}`
- Grados: `g3` a `g12`
- Escenarios: `s1` a `s8`
- Temas: `t1` (tema 1) o `t2` (tema 2)
- Habilidades: `listening` · `reading` · `speaking` · `writing` · `mediation`

---

## 🔄 Hoja de ruta

- [x] Fase 1 — Base de datos + Auth (Supabase)
- [ ] Fase 2 — Dashboard del docente
- [ ] Fase 3 — Contenido interactivo Grades 7–12
- [ ] Fase 4 — PWA completa / Offline Service Worker

---

## 🇵🇦 Contexto panameño

Todo el contenido está contextualizado para Panamá:
Canal de Panamá · frutas tropicales · temporada de lluvias · pollera · molas · leyendas · Casco Antiguo
