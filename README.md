# Recopelis

Recopelis es una plataforma web IPTV/VOD desarrollada con React, TypeScript y Node.js. El proyecto está orientado a cargar, organizar y reproducir contenido multimedia desde listas M3U y, progresivamente, integrar proveedores compatibles con Xtream.

## Estado actual

Actualmente Recopelis ya permite:

- Cargar listas M3U desde una URL.
- Parsear canales y contenido desde archivos M3U.
- Mostrar el catálogo completo en una interfaz visual.
- Seleccionar un canal desde el catálogo.
- Reproducir streams HLS mediante `hls.js`.
- Guardar perfiles de listas vinculados al usuario con Firebase.
- Detectar credenciales en URLs con formato Xtream.
- Utilizar un backend Express para realizar solicitudes server-to-server y evitar limitaciones de CORS del navegador.
- Mostrar el estado de sesión del usuario dentro de la interfaz principal.

> La integración Xtream se encuentra en desarrollo. Algunos proveedores no exponen endpoints estándar y pueden responder HTML en lugar de JSON o M3U.

## Arquitectura actual

```text
Usuario
  ↓
React + TypeScript + Vite
  ↓
Servicios del frontend
  ├── M3U parser
  ├── Firebase
  └── Xtream client
  ↓
Express API
  ↓
Proveedor IPTV / VOD
```

Para contenido HLS reproducible directamente:

```text
M3U
 ↓
parseM3u()
 ↓
M3uItem[]
 ↓
Catálogo React
 ↓
Canal seleccionado
 ↓
WebPlayer
 ↓
hls.js
 ↓
Video HTML5
```

## Tecnologías principales

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- Firebase
- HLS.js
- ESLint

### Backend

- Node.js
- Express
- TypeScript
- CORS
- dotenv
- tsx

## Estructura del proyecto

```text
recopelis/
├── server/                      # API backend con Express y TypeScript
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── package-lock.json
├── web/                         # Aplicación web principal
│   └── src/
│       ├── components/
│       ├── features/
│       │   ├── auth/
│       │   ├── home/
│       │   └── player/
│       └── services/
├── docs/                        # Documentación adicional
├── INSTRUCCIONES_EJECUCION.md   # Guía de ejecución
├── ROADMAP.md                   # Planeación del proyecto
└── CHANGELOG.md                 # Registro de cambios
```

## Ejecución local

### Frontend

```bash
cd web
npm install
npm run dev
```

Por defecto Vite ejecutará la aplicación en un puerto local, normalmente `http://localhost:5173`.

### Backend

En otra terminal:

```bash
cd server
npm install
npm run dev
```

La API local se ejecuta actualmente en:

```text
http://localhost:3000
```

Puedes comprobarla mediante:

```text
GET /health
```

## Flujo Git recomendado

El desarrollo se realiza mediante ramas de funcionalidad antes de integrar cambios a `main`.

Ejemplo:

```bash
git switch main
git pull origin main
git switch -c feature/nueva-funcionalidad
```

Después de probar los cambios:

```bash
git add .
git commit -m "feat: describe the new feature"
git push origin feature/nueva-funcionalidad
```

## Próximos objetivos

El plan detallado se encuentra en [`ROADMAP.md`](./ROADMAP.md). Las siguientes prioridades son mejorar la navegación de catálogos grandes, organizar contenido por categorías, fortalecer el reproductor y convertir la integración M3U/Xtream en una capa backend segura y reutilizable.

## Objetivo del proyecto

Recopelis busca evolucionar de un prototipo funcional a una aplicación con arquitectura profesional que pueda utilizarse como proyecto de portafolio. El proyecto permite demostrar conocimientos de frontend moderno, TypeScript, APIs, autenticación, bases de datos, reproducción multimedia, integración con servicios externos y diseño de arquitectura cliente-servidor.

## Autor

**Erick Alvarado**  
Desarrollo de Software  
GitHub: [@Jerielerick](https://github.com/Jerielerick)
