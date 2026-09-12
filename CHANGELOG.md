# Changelog

Todos los cambios relevantes de Recopelis se documentarán aquí.

## 2026-09-12

### Added

- Backend inicial con Express y TypeScript dentro de `server/`.
- Endpoint `GET /health` para comprobar el estado de la API.
- Pruebas server-to-server para proveedores IPTV/Xtream.
- Selección de canales desde el catálogo.
- Integración del reproductor `WebPlayer` con los elementos M3U seleccionados.
- Reproducción HLS mediante `hls.js`.
- Visualización del catálogo completo, eliminando el límite temporal de 12 elementos.

### Changed

- Página principal rediseñada con una interfaz más visual para conectar fuentes y explorar contenido.
- Flujo de carga del catálogo preparado para diferenciar fuentes M3U y formatos asociados a Xtream.
- Servicio Xtream actualizado para utilizar la API propia de Recopelis durante las pruebas de conectividad.
- Documentación principal actualizada con la arquitectura frontend/backend actual.

### Investigated

- Proveedores que responden `XUI.one - Debug Mode` con `Content-Type: text/html` a pesar de devolver HTTP 200.
- Limitaciones de CORS al realizar peticiones IPTV directamente desde el navegador.
- Diferencias entre URLs de playlist directas y endpoints estándar como `player_api.php` y `get.php`.

### Known limitations

- La integración Xtream todavía está en desarrollo.
- Algunos proveedores no implementan o no exponen endpoints Xtream estándar.
- La carga M3U aún puede depender de CORS cuando se realiza directamente desde el frontend.
- Las credenciales IPTV deben moverse a una estrategia de almacenamiento y procesamiento más segura antes de un despliegue público.

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
