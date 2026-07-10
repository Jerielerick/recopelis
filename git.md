Plantilla para cualquier proyecto

Cada vez que entres a un proyecto, haz esto:

cd RUTA-DEL-PROYECTO
git status
git branch --show-current
git remote -v

Después ya puedes trabajar:

git switch main
git pull origin main
git switch -c fix/nombre-del-cambio

Modificas el código, guardas y luego:

git status
git add .
git commit -m "Mensaje del cambio"
git push -u origin fix/nombre-del-cambio


| Situación                                                   | Prefijo     |
| ----------------------------------------------------------- | ----------- |
| Algo falla y lo vas a corregir                              | `fix/`      |
| Vas a crear una función nueva                               | `feature/`  |
| Vas a agregar pruebas                                       | `test/`     |
| Vas a cambiar documentación                                 | `docs/`     |
| Vas a limpiar/mejorar código sin cambiar funcionalidad      | `refactor/` |
| Vas a cambiar configuración, dependencias o tareas internas | `chore/`    |
