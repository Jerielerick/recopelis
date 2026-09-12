# Changelog

Todos los cambios relevantes de Recopelis se documentarán aquí.

## 2026-09-12

### Added

- Backend inicial con Express y TypeScript dentro de `server/`.
- Endpoint `GET /health` para comprobar el estado de la API.
- Pruebas server-to-server para proveedores IPTV/Xtream.
- Búsqueda del catálogo por título.
- Categorías dinámicas obtenidas de `group-title`, incluyendo grupos múltiples separados por `;`.
- Filtrado combinado por búsqueda y categoría.
- Conteo de resultados visibles y estado vacío para búsquedas sin coincidencias.
- Selección visual del canal activo desde el catálogo.
- Panel del reproductor con título y categoría del contenido seleccionado.
- Botón para cerrar el reproductor.
- Scroll automático y suave hacia el reproductor al seleccionar un canal.
- Integración del reproductor `WebPlayer` con los elementos M3U seleccionados.
- Reproducción HLS mediante `hls.js`.
- Visualización del catálogo completo, eliminando el límite temporal de 12 elementos.

### Fixed

- Resolución del módulo de autenticación al separar `AuthProvider.tsx` de `AuthContext.ts`, evitando la colisión de nombres que impedía importar `AuthProvider` correctamente durante la ejecución en el navegador.

### Changed

- Página principal rediseñada con una interfaz más visual para conectar fuentes y explorar contenido.
- Tarjetas del catálogo actualizadas para indicar visualmente cuál contenido está seleccionado.
- Flujo de carga del catálogo preparado para diferenciar fuentes M3U y formatos asociados a Xtream.
- Servicio Xtream actualizado para utilizar la API propia de Recopelis durante las pruebas de conectividad.
- Documentación principal actualizada con la arquitectura frontend/backend actual.
- Roadmap actualizado para marcar búsqueda, filtros y mejoras del reproductor como completados y establecer `refactor/backend-m3u` como siguiente etapa.

### Investigated

- Proveedores que responden `XUI.one - Debug Mode` con `Content-Type: text/html` a pesar de devolver HTTP 200.
- Limitaciones de CORS al realizar peticiones IPTV directamente desde el navegador.
- Diferencias entre URLs de playlist directas y endpoints estándar como `player_api.php` y `get.php`.

### Known limitations

- La integración Xtream todavía está en desarrollo.
- Algunos proveedores no implementan o no exponen endpoints Xtream estándar.
- La carga M3U aún puede depender de CORS cuando se realiza directamente desde el frontend.
- Las credenciales IPTV deben moverse a una estrategia de almacenamiento y procesamiento más segura antes de un despliegue público.

## Próxima sesión

La siguiente etapa recomendada es crear la rama:

```text
refactor/backend-m3u
```

El objetivo será mover la carga de listas M3U al backend de Recopelis para reducir la dependencia del CORS del proveedor y continuar consolidando la arquitectura frontend → API propia → proveedor IPTV.

## Convenciones futuras

Se recomienda utilizar mensajes de commit siguiendo un estilo consistente:

```text
feat: nueva funcionalidad
fix: corrección de error
refactor: reorganización sin cambiar comportamiento
style: cambios visuales
test: pruebas
docs: documentación
ci: automatización y pipelines
chore: mantenimiento
```
