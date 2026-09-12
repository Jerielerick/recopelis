# Roadmap de Recopelis

Este documento marca el rumbo técnico del proyecto y propone una secuencia de entregas pequeñas y profesionales. La idea es que cada bloque pueda convertirse en un commit o push claramente identificable.

## Estado actual

### Completado

- Rediseño visual de la página principal.
- Carga de listas M3U desde URL.
- Parser de elementos `#EXTINF`.
- Visualización del catálogo completo.
- Búsqueda del catálogo por nombre.
- Categorías dinámicas a partir de `group-title`, incluyendo grupos múltiples separados por `;`.
- Filtrado combinado por búsqueda y categoría.
- Conteo de resultados visibles y estado vacío cuando no existen coincidencias.
- Selección visual de canales desde tarjetas.
- Panel del reproductor con título y categoría del contenido seleccionado.
- Botón para cerrar el reproductor.
- Scroll automático y suave hacia el reproductor al seleccionar contenido.
- Reproducción HLS mediante `hls.js`.
- Corrección de la estructura de autenticación separando `AuthContext`, `AuthProvider` y `useAuth`.
- Integración inicial con Firebase para perfiles de listas.
- Detección inicial de URLs Xtream.
- Backend Express con endpoint de salud.
- Pruebas server-to-server para proveedores IPTV/Xtream.
- Diagnóstico de respuestas HTML/XUI.one en proveedores no compatibles con endpoints estándar.

## Entregas completadas

### 1. `feat: add catalog search` — COMPLETADO

Rama integrada:

```text
feature/catalog-search
```

Incluyó búsqueda por nombre, categorías dinámicas, filtrado por grupo, conteo de resultados y estado vacío. Las categorías y filtros previstos originalmente como una segunda entrega se incorporaron en esta misma rama.

---

### 2. `feat: improve media player experience` — COMPLETADO

Rama integrada:

```text
feature/player-improvements
```

Incluyó selección visual del canal activo, panel con título y categoría, botón para cerrar el reproductor y scroll automático hacia el reproductor al seleccionar contenido. Durante esta entrega también se corrigió la resolución del módulo `AuthProvider` en un commit independiente.

---

## Próximos pushes propuestos

### 3. `refactor: move M3U loading to backend` — SIGUIENTE

Objetivo: evitar depender del CORS del proveedor desde el navegador y consolidar la arquitectura frontend → API propia → proveedor IPTV.

Incluye:

- Endpoint backend para cargar listas M3U.
- Validación de respuestas M3U.
- Parser reutilizable en servidor o capa compartida.
- Respuestas de error consistentes.
- Evitar registrar URLs completas con credenciales.

Rama sugerida:

```text
refactor/backend-m3u
```

> Antes de desplegar este endpoint públicamente será necesario protegerlo contra SSRF, validar protocolos y bloquear destinos internos o privados.

---

### 4. `feat: normalize IPTV source detection`

Objetivo: manejar diferentes formatos de entrada sin acoplar Recopelis a un proveedor específico.

Incluye:

- Detección de URL M3U directa.
- Detección de formatos `/playlist/usuario/password/...`.
- Detección de formatos `/usuario/password` cuando sean compatibles.
- Separación entre credenciales y estrategia de conexión.
- Adaptadores para M3U y Xtream.

Rama sugerida:

```text
feature/source-detection
```

---

### 5. `feat: add standard Xtream integration`

Objetivo: soportar servidores que implementen correctamente la API Xtream estándar.

Incluye:

- Autenticación vía backend.
- Verificación de cuenta.
- Categorías live.
- Streams live.
- Películas y series cuando el proveedor las exponga.
- Conversión de respuestas Xtream al modelo interno de Recopelis.

Rama sugerida:

```text
feature/xtream-api
```

> No todos los proveedores que usan paneles tipo XUI exponen una API Xtream estándar. La aplicación debe detectar fallos y no asumir compatibilidad.

---

### 6. `refactor: secure IPTV credentials`

Objetivo: evitar que credenciales sensibles permanezcan expuestas en frontend o documentos accesibles desde el cliente.

Incluye:

- Revisar el almacenamiento actual en Firebase.
- Mover operaciones sensibles al backend.
- Evitar credenciales en logs.
- Variables de entorno para configuración del servidor.
- Reglas de Firestore revisadas.

Rama sugerida:

```text
refactor/secure-credentials
```

---

### 7. `feat: add saved libraries and favorites`

Objetivo: mejorar la experiencia personalizada del usuario autenticado.

Incluye:

- Listas guardadas.
- Favoritos.
- Últimos contenidos reproducidos.
- Persistencia por usuario.

Rama sugerida:

```text
feature/user-library
```

---

### 8. `test: add frontend and backend tests`

Objetivo: aumentar la calidad y confianza del proyecto.

Incluye:

- Tests del parser M3U.
- Tests de detección de fuentes.
- Tests de endpoints Express.
- Tests de estados importantes del frontend.

Rama sugerida:

```text
test/core-services
```

---

### 9. `ci: add quality pipeline`

Objetivo: automatizar validaciones antes de integrar código.

Incluye:

- Instalación de frontend y backend.
- Lint.
- Build.
- Tests.
- GitHub Actions.

Rama sugerida:

```text
ci/quality-pipeline
```

---

### 10. `docs: polish portfolio documentation`

Objetivo: dejar el repositorio listo para entrevistas y revisión técnica.

Incluye:

- Capturas de pantalla.
- Diagrama de arquitectura.
- Flujo de datos.
- Decisiones técnicas.
- Instrucciones completas de instalación.
- Limitaciones conocidas.
- Demo o GIF si es posible.

Rama sugerida:

```text
docs/portfolio-polish
```

## Orden recomendado desde el estado actual

```text
1. M3U mediante backend       ← siguiente sesión
2. Normalización de fuentes
3. Xtream estándar
4. Seguridad de credenciales
5. Biblioteca y favoritos
6. Tests
7. CI
8. Documentación final
```

## Criterio para integrar a `main`

Una funcionalidad debería llegar a `main` cuando:

- Compila correctamente.
- No rompe el flujo existente.
- Fue probada manualmente en el navegador cuando aplica.
- No contiene credenciales o datos sensibles.
- Tiene commits claros y separados por responsabilidad.
- Su rama está actualizada con `main` si es necesario.
- El Pull Request describe qué cambió y cómo probarlo.

## Meta del proyecto

Recopelis debe terminar mostrando una arquitectura clara y defendible técnicamente:

```text
Frontend React
   ↓
API propia
   ↓
Servicios y adaptadores IPTV
   ↓
M3U / Xtream

Firebase
   ↕
Usuarios, preferencias y biblioteca
```

El objetivo no es solamente que funcione, sino que el repositorio muestre buenas prácticas de desarrollo, separación de responsabilidades, seguridad, documentación y evolución incremental.
