# Guía rápida de Git y ramas

Esta guía sirve para trabajar proyectos con Git y GitHub de forma ordenada, usando ramas para cada mejora, corrección, prueba o documentación.

---

## 1. Entrar al proyecto

Antes de usar Git, primero debo entrar a la carpeta del proyecto.

```bash
cd RUTA_DEL_PROYECTO
```

Ejemplo:

```bash
cd C:\Users\jerie\OneDrive\Escritorio\nexum-\nexum-app
```

Otro ejemplo:

```bash
cd C:\Users\jerie\OneDrive\Escritorio\recopelis
```

---

## 2. Revisar el estado del proyecto

```bash
git status
```

Este comando muestra si hay archivos modificados, archivos nuevos o cambios pendientes.

Ejemplo de salida:

```text
modified: src/services/api.ts
```

Eso significa que el archivo fue modificado.

---

## 3. Ver en qué rama estoy

```bash
git branch
```

La rama actual aparece con un asterisco `*`.

También puedo usar:

```bash
git branch --show-current
```

Este comando muestra únicamente el nombre de la rama actual.

---

## 4. Cambiar a la rama principal

Normalmente la rama principal se llama `main`.

```bash
git switch main
```

Este comando cambia mi trabajo a la rama `main`.

---

## 5. Actualizar la rama principal

Antes de crear una rama nueva, conviene bajar los cambios más recientes de GitHub.

```bash
git pull origin main
```

Esto actualiza mi rama local `main` con lo que está en GitHub.

---

## 6. Crear una rama nueva

Una rama sirve para trabajar cambios sin afectar directamente `main`.

La estructura recomendada es:

```text
tipo/nombre-del-cambio
```

Ejemplo:

```bash
git switch -c fix/conexion-api
```

Este comando crea una rama nueva y me cambia automáticamente a ella.

---

# Tipos de ramas

## `fix/`

Se usa para corregir errores.

Ejemplos:

```bash
git switch -c fix/conexion-api
git switch -c fix/error-login
git switch -c fix/mapa-no-carga
```

---

## `feature/`

Se usa para agregar una función nueva.

Ejemplos:

```bash
git switch -c feature/mapas-mobile
git switch -c feature/filtro-peliculas
git switch -c feature/perfil-usuario
```

---

## `test/`

Se usa para agregar o modificar pruebas.

Ejemplos:

```bash
git switch -c test/pruebas-login
git switch -c test/pruebas-api
git switch -c test/pruebas-backend
```

---

## `docs/`

Se usa para documentación.

Ejemplos:

```bash
git switch -c docs/guia-git
git switch -c docs/instrucciones-ejecucion
git switch -c docs/actualizar-readme
```

---

## `refactor/`

Se usa para mejorar o reorganizar código sin cambiar su funcionalidad.

Ejemplos:

```bash
git switch -c refactor/servicios-api
git switch -c refactor/auth-controller
```

---

## `chore/`

Se usa para tareas de mantenimiento, configuración o dependencias.

Ejemplos:

```bash
git switch -c chore/actualizar-dependencias
git switch -c chore/configurar-eslint
git switch -c chore/limpiar-archivos
```

---

# Flujo normal de trabajo

## 1. Entrar al proyecto

```bash
cd RUTA_DEL_PROYECTO
```

## 2. Ir a main

```bash
git switch main
```

## 3. Actualizar main

```bash
git pull origin main
```

## 4. Crear una rama nueva

```bash
git switch -c tipo/nombre-del-cambio
```

Ejemplo:

```bash
git switch -c fix/conexion-api
```

## 5. Modificar archivos

Se modifican los archivos en Visual Studio Code y se guardan los cambios.

## 6. Revisar cambios

```bash
git status
```

## 7. Agregar cambios

Para agregar todos los archivos modificados:

```bash
git add .
```

Para agregar un archivo específico:

```bash
git add ruta/del/archivo
```

Ejemplo:

```bash
git add src/services/api.ts
```

## 8. Crear commit

```bash
git commit -m "Mensaje claro del cambio"
```

Ejemplo:

```bash
git commit -m "Corregir conexión con API"
```

## 9. Subir la rama a GitHub

```bash
git push -u origin tipo/nombre-del-cambio
```

Ejemplo:

```bash
git push -u origin fix/conexion-api
```

---

# Plantilla rápida para copiar

```bash
cd RUTA_DEL_PROYECTO

git switch main
git pull origin main

git switch -c tipo/nombre-del-cambio

git status
git add .
git commit -m "Mensaje claro del cambio"

git push -u origin tipo/nombre-del-cambio
```

---

# Ejemplo con fix

```bash
cd RUTA_DEL_PROYECTO

git switch main
git pull origin main

git switch -c fix/conexion-api

git status
git add .
git commit -m "Corregir conexión con API"

git push -u origin fix/conexion-api
```

---

# Ejemplo con feature

```bash
cd RUTA_DEL_PROYECTO

git switch main
git pull origin main

git switch -c feature/filtro-peliculas

git status
git add .
git commit -m "Agregar filtro de películas"

git push -u origin feature/filtro-peliculas
```

---

# Ejemplo con docs

```bash
cd RUTA_DEL_PROYECTO

git switch main
git pull origin main

git switch -c docs/guia-git

git status
git add .
git commit -m "Agregar guía rápida de Git"

git push -u origin docs/guia-git
```

---

# Diferencia entre add, commit y push

## `git add`

Prepara los archivos para guardarlos en Git.

```bash
git add .
```

## `git commit`

Guarda los cambios en el historial local de Git.

```bash
git commit -m "Mensaje del cambio"
```

## `git push`

Sube los commits a GitHub.

```bash
git push -u origin nombre-de-la-rama
```

---

# Cambiar entre proyectos

Cada proyecto tiene su propia carpeta y sus propias ramas.

Ejemplo:

```text
nexum-app  → ramas de NEXUM
recopelis  → ramas de Recopelis
```

Para trabajar en NEXUM:

```bash
cd C:\Users\jerie\OneDrive\Escritorio\nexum-\nexum-app
git status
git branch --show-current
```

Para trabajar en Recopelis:

```bash
cd C:\Users\jerie\OneDrive\Escritorio\recopelis
git status
git branch --show-current
```

La regla importante es revisar siempre en qué carpeta estoy antes de hacer cambios.

---

# Comandos importantes para revisar

Ver estado:

```bash
git status
```

Ver rama actual:

```bash
git branch --show-current
```

Ver repositorio conectado:

```bash
git remote -v
```

Ver historial de commits:

```bash
git log --oneline
```

Ver últimos 5 commits:

```bash
git log --oneline -5
```

---

# Cuando Git dice "nothing to commit"

Si aparece:

```text
nothing to commit, working tree clean
```

Significa que no hay cambios pendientes.

Puede ser porque:

- Ya se subieron los cambios.
- No se guardó el archivo.
- Se está trabajando en otra carpeta.
- El archivo quedó igual que antes.

---

# Regla de oro

```text
No se hace push directamente de archivos.
Primero se hace add, después commit y finalmente push.
```

Flujo básico:

```bash
git add .
git commit -m "Mensaje del cambio"
git push
```

---

# Resumen para memorizar

```bash
git status
git switch main
git pull origin main
git switch -c tipo/nombre-del-cambio
git add .
git commit -m "Mensaje del cambio"
git push -u origin tipo/nombre-del-cambio
```