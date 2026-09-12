# Roadmap de Recopelis

Este documento marca el rumbo técnico del proyecto y propone una secuencia de entregas pequeñas y profesionales. La idea es que cada bloque pueda convertirse en un commit o push claramente identificable.

## Estado actual

### Completado

- Rediseño visual de la página principal.
- Carga de listas M3U desde URL.
- Parser de elementos `#EXTINF`.
- Visualización del catálogo completo.
- Selección de canales desde tarjetas.
- Reproducción HLS mediante `hls.js`.
- Integración inicial con Firebase para perfiles de listas.
- Detección inicial de URLs Xtream.
- Backend Express con endpoint de salud.
- Pruebas server-to-server para proveedores IPTV/Xtream.
- Diagnóstico de respuestas HTML/XUI.one en proveedores no compatibles con endpoints estándar.

## Próximos pushes propuestos

### 1. `feat: add catalog search`

Objetivo: permitir encontrar canales rápidamente dentro de listas grandes.

Incluye:

- Campo de búsqueda.
- Filtrado por nombre.
- Conteo de resultados visibles.
- Estado vacío cuando no existen coincidencias.

Rama sugerida:

```text
feature/catalog-search
```

---

### 2. `feat: add catalog categories and filters`

Objetivo: organizar el contenido por `group-title` y tipo.

Incluye:

- Categorías dinámicas.
- Filtro por grupo.
- Filtro por tipo: live, movie, series.
- Botón para limpiar filtros.

Rama sugerida:

```text
feature/catalog-filters
```

---

### 3. `feat: improve media player experience`

Objetivo: convertir el reproductor actual en una experiencia más completa.

Incluye:

- Resaltar la tarjeta seleccionada.
- Mostrar título y categoría del contenido reproducido.
- Mejorar estados de carga y error.
- Cambio limpio entre streams.
- Manejo de reproducción fallida.

Rama sugerida:

```text
feature/player-improvements
```

---

### 4. `refactor: move M3U loading to backend`

Objetivo: evitar depender del CORS del proveedor desde el navegador.

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

### 5. `feat: normalize IPTV source detection`

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

### 6. `feat: add standard Xtream integration`

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

### 7. `refactor: secure IPTV credentials`

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

### 8. `feat: add saved libraries and favorites`

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

### 9. `test: add frontend and backend tests`

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

### 10. `ci: add quality pipeline`

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

### 11. `docs: polish portfolio documentation`

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

## Orden recomendado

```text
1. Búsqueda
2. Categorías y filtros
3. Mejoras del reproductor
4. M3U mediante backend
5. Normalización de fuentes
6. Xtream estándar
7. Seguridad de credenciales
8. Biblioteca y favoritos
9. Tests
10. CI
11. Documentación final
```

## Criterio para integrar a `main`

Una funcionalidad debería llegar a `main` cuando:

- Compila correctamente.
- No rompe el flujo existente.
- Fue probada manualmente.
- No contiene credenciales o datos sensibles.
- Tiene un commit claro.
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
