# Recopelis - Arquitectura del Proyecto

> Última actualización: Julio 2026

---

# 1. Visión del proyecto

Recopelis es una plataforma IPTV/VOD multiplataforma diseñada para reproducir contenido proveniente de listas M3U y servidores Xtream Codes.

El objetivo del proyecto es ofrecer una experiencia moderna, rápida y organizada tanto en Web como en dispositivos móviles y Android TV, compartiendo la mayor cantidad posible de lógica entre plataformas sin comprometer la experiencia de usuario de cada una.

---

# 2. Objetivos

- Crear una aplicación escalable.
- Mantener una arquitectura limpia y modular.
- Compartir la lógica entre plataformas.
- Separar la interfaz de la lógica del negocio.
- Facilitar el mantenimiento y futuras mejoras.
- Mantener un historial de desarrollo profesional utilizando Git y GitHub.

---

# 3. Tecnologías

## Web

- React
- TypeScript
- Vite

## Mobile

- React Native

## Android TV

- Android Nativo (Kotlin)

## Backend

- Firebase Authentication
- Cloud Firestore

## Reproducción

- HLS.js (Web)
- Reproductor nativo para Mobile
- ExoPlayer para Android TV

---

# 4. Filosofía del proyecto

Recopelis utilizará una arquitectura basada en funcionalidades (Feature-Based Architecture).

Cada módulo será independiente y contendrá sus propios componentes, servicios, hooks y tipos cuando sea necesario.

La lógica compartida se mantendrá desacoplada de la interfaz para facilitar la reutilización entre plataformas.

---

# 5. Estructura general

```text
web/
src/

app/
assets/
components/
features/
hooks/
layouts/
routes/
services/
styles/
types/
utils/
```

Las funcionalidades principales vivirán dentro de:

```text
features/

auth/
home/
player/
m3u/
profile/
settings/
```

---

# 6. Flujo de desarrollo

Cada nueva funcionalidad seguirá el siguiente proceso:

Issue

↓

Branch

↓

Desarrollo

↓

Commit

↓

Push

↓

Pull Request

↓

Merge

↓

Actualizar main

No se desarrollarán funcionalidades directamente sobre la rama main.

---

# 7. Convención de commits

Se utilizarán Commits Convencionales.

Ejemplos:

feat(web): agregar pantalla de login

fix(player): corregir reproducción HLS

refactor(auth): reorganizar módulo de autenticación

docs: actualizar arquitectura

test(m3u): agregar pruebas del parser

---

# 8. Estrategia de ramas

main

Contiene únicamente código estable.

feature/*

Nuevas funcionalidades.

fix/*

Corrección de errores.

docs/*

Documentación.

---

# 9. Roadmap

Sprint 0

Infraestructura del proyecto.

Sprint 1

Navegación y Layout.

Sprint 2

Autenticación con Firebase.

Sprint 3

Gestión de listas M3U y Xtream.

Sprint 4

Catálogo de contenido.

Sprint 5

Reproductor HLS.

Sprint 6

Aplicación móvil.

Sprint 7

Android TV.

---

# 10. Objetivo a largo plazo

Construir una plataforma IPTV/VOD moderna, escalable y mantenible que pueda evolucionar durante los próximos años sin perder organización ni calidad del código.