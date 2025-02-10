TaskManagerApp es una aplicación web de gestión de tareas construida con Laravel 11 para el backend, Angular 19 para el frontend, y MySQL como base de datos. Permite a los usuarios registrarse, iniciar sesión, y gestionar sus tareas de manera eficiente mediante una interfaz sencilla y funcional.


Tecnologías Utilizadas
Backend:

**Laravel 11**
API RESTful para CRUD de usuarios y tareas
MySQL como base de datos
Frontend:

**Angular 19**
Tailwind CSS y DaisyUI para diseño de la interfaz de usuario
Otros:

**Postman para pruebas de la API**
Node.js y NPM para gestionar dependencias del frontend
🛠️ Características Principales
Base de Datos:

Usuarios: Permite el registro y almacenamiento de datos de usuarios.
Tareas: Permite a los usuarios crear, actualizar, eliminar y marcar como completadas sus tareas.
Relación uno a muchos: Un usuario puede tener varias tareas.
Backend (Laravel):

API RESTful para interactuar con la base de datos.
Endpoints para crear, leer, actualizar y eliminar usuarios y tareas.
Frontend (Angular):

Componente para registrar nuevos usuarios.
Componente para ingresar al sistema (sin autenticación).
Componente para gestionar tareas (crear, actualizar, eliminar y marcar como completadas).
