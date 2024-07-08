# Sonica Api
- [Sonica Api](#sonica-api)
  - [Descripcion del Proyecto](#descripcion-del-proyecto)
  - [Acerca de](#acerca-de)
  - [Estructura](#estructura)
  - [Tecnologías Usadas](#tecnologías-usadas)
  - [Instalación](#instalación)
  - [Seguridad](#seguridad)
  - [Nosotros](#nosotros)


## Descripcion del Proyecto
Sonica Api es la segunda parte de nuestro proyecto de frontend para el proceso formativo en programación fullstack con JS y NodeJs de Codo a Codo.

El mismo es un servidor desarrollado con Node y express.js que complementa la lógica de negocio del proyecto de frontend. 
Se realizan operaciones básicas de CRUD de entidades asi como validación de credenciales de usuario y manejo de sesiones.
Se desarrollo usando un patron MVC basado en la estructura de un servidor REST. No se utilizo ningun ORM ni paquete de modelos para esta instancia, la persistencia de datos se logra gracias al conector Mysql2 utilizando Mysql como modelo de base de datos relacional.

## Acerca de
Sonica es un proyecto web desarrollado para el curso de programacion Fullstack de **Codo a Codo**. Todo lo desarrollado fue hecho con fines educativos.  
Si te gusto o queres saber mas de nosotros podes encontrar nuestros perfiles y redes debajo.

## Estructura

<details>

- `project-root/`
  - `node_modules`
  - `src/`
    - `config`
      - `db.json`
    - `controllers`
      - `entradaControlador`
      - `eventoControlador`
      - `usuariocontrolador`
    - `middlewares`
      - `auth`
    - `routes`
      - `entradaRuta`
      - `eventoRuta`
      - `usuarioRuta`
    - `service`
      - `entradaServicio`
      - `eventoServicio`
      - `usuarioServicio`
    - `utils`
      - `queries`
  - `app.js`
  - `.env`
  - `package.json`
  - `README.md`
  - `package.json`

</details>

## Tecnologías Usadas
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Instalación

Para su ejecucion local, es necesario clonar el repositorio, previo a su ejecucion, asegurarse de crear una base de datos relacional ejecutando el script que se aloja en la carpeta Utils (crea tablas necesarias para la ejecucion del proyecto). Tambien es importante instalar dependencias mediante <code>'npm install'</code> 

Crear .env con variables de entorno sugeridas para la ejecucion del proyecto.
El mismo debe contener las siguientes variables de entorno:
~~~DB_HOST= link/direccion de tu base de datos
DB_USER= usuario
DB_PASSWORD= contraseña
DB_NAME= nombre '

CORS_ORIGIN= url sitio donde tengas alojado o donde corras el cliente frontend

JWT_SECRET= llave secreta de encriptacion de tu token
~~~

## Seguridad
Sonica back se complementa con su frontend utilizando la tecnología de JsonWebToken (JWT). El mismo consta de un payload con la información mínima necesaria para evaluar el rol y tipo de usuario que inicia sesión. Al iniciar sesión se firma y envía un token al cliente que quedará almacenado en el session storage del navegador hasta su expiración (seteo por defecto 1 hora).

Si se desea modificar su salt y tiempo de expiración se debe acudur a la siguiente ruta:

<code>usuarioControlador.login</code>

y modificar el tiempo de expiración del mismo.

una vez firmado este token se pedirá cada vez que se intente acceder a rutas protegidas. Esa validación se logra mediante un modulo de autenticacion ubicado en `middlewares/auth.js`. El mismo consta de dos funciones principales. Por un lado validar la sesion activa y expiración del token, y por otro el grado de autoridad del usuario segun los datos almacenados en el Paylad.

Se puede ver que rutas son publicas y protegidas viendo la carpeta `/routes/*`, en general se observan dos tipos de rutas, router.public y router.protected. Del lado del cliente tambien se cuenta con un modulo de auth que valida la credencial de usuario limitando el acceso a ciertas secciones.

###Roles

Hay 3 roles basicos dentro de esta aplicacion 'Cliente', 'Organizador' y 'Administrador'.

 -Cliente, solo puede navegar por el sitio, modificar sus datos base y comprar entradas.

 -Organizador, solo puede cargar eventos, modificarlos y gestionar cantidad de entradas de los mismos (tambien observa metricas generales de las mismas).

 -Administrador, además de navegar por el sitio, es capaz de gestionar usuarios, cambiar sus roles y eliminarlos (es el unico capaz de realizar la gestion para promover a Cliente, Administrador u Organizador), tambien puede ver lista de usuarios, eventos y eliminarlos.

##Rutas y persistencia de datos.

Esta aplicación cuenta con los siguientes puntos de acceso.

*Usuario*
~~~
(publico) /usuario -> /login, /register [inicio de sesión y registro]
(protegido usuarios logueados cualquier rol) /usuarios -> /datosSesion, /cambiarPass, /logout,/:id(.put y .get) [obtiene credenciales de usuario, modificacion de datos y deslogueo]
(protegido Administrador) -> /lista, /modificarRol, /:id(.delete)
~~~

*Evento*
~~~
(publico) /evento -> /lista [lista de eventos que envia a la landing page]
(protegido cualquier rol) /eventos -> /:id(get)
(protegido solo Organizador) /eventos -> /(post), /:id(put)
(protegido Organizador y Administrador) /eventos -> /:id(delete)
~~~

*Entrada*

~~~
(publico) /entrada -> /:id(get) [obtiene entradas por id de evento]
(protegido solo rol Cliente) /entradas -> /compra/:id [compra entradas]
(protegido solo Organizador) /entradas -> /org/:id(put y delete) [modificacion y delete de entradas (aun sin soporte)]
~~~



## Nosotros
**Karina Crognale**

>Programadora Web Fullstack  

Redes:

>[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/karina-karen-crognale/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/karinacrognale)

**Lautaro Sanchez**

>Programador Web Fullstack  

Redes:
>[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/germanlautarosanchezmdz/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/n75770)

**Franco Rasia**

>Programador Web Fullstack  

Redes:
>[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/francorasia/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/FraNkoRasia)

**Pablo Velasco**
>Programador Web Fullstack  

Redes:
>[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pablo-r-velasco/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Pablo-r-stack)