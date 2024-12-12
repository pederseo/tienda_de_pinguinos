# Proyecto de Tienda Online para Pingüinos 🐧

Este proyecto cumple con los requisitos establecidos para crear un sistema de gestión para una tienda online. Los pingüinos pueden realizar pedidos, y Paula puede administrar el inventario de productos. El backend está desarrollado en **Node.js + Express** con **MongoDB** como base de datos, y el frontend está desarrollado con **Go**.

## Requisitos Cumplidos

### 🐧 Panel de Administración (Node.js + Express + MongoDB)

1. **CRUD de productos**:
   - Implementé un sistema **CRUD** completo donde Paula puede agregar, editar y eliminar productos de la tienda. Esta funcionalidad está gestionada desde el backend con **Express** y **MongoDB**.
   
2. **Visualización de pedidos**:
   - Paula tiene acceso a un panel donde puede ver todos los pedidos realizados por los pingüinos, incluyendo los productos solicitados y la información de cada pedido.

3. **Sistema de inicio de sesión**:
   - Utilicé **JWT (JSON Web Tokens)** para implementar un sistema de inicio de sesión seguro. Solo Paula tiene acceso al panel de administración, protegiendo las rutas con autenticación basada en tokens, evitando el uso de cookies 🍪.

4. **Renderizado en servidor**:
   - Usé **EJS** como motor de plantillas para renderizar las vistas en el servidor, cumpliendo con la necesidad de Paula de evitar JavaScript en el frontend y asegurar que el renderizado se realice completamente en el servidor.

### 🐟 Tienda Online (Go + MongoDB)

1. **Mostrar productos**:
   - Los pingüinos pueden ver los productos disponibles en la tienda online, tal como se requiere, con un diseño fácil de navegar y sin la necesidad de JavaScript en el frontend.

2. **Crear pedidos**:
   - Los pingüinos pueden crear pedidos, enviando la dirección de su iglú 🏠 y seleccionando los productos que desean comprar. La creación de pedidos está gestionada en el backend y almacenada en **MongoDB**.

3. **Renderizado en servidor**:
   - El frontend está desarrollado con **Go** y utiliza **http/template** para el renderizado en el servidor. Esto garantiza que no se utiliza JavaScript en el cliente, cumpliendo con los requisitos establecidos para los pingüinos.

## Herramientas Utilizadas

### Backend:
- **Node.js + Express**: Para crear el servidor y gestionar las rutas.
- **MongoDB**: Para almacenar los productos y los pedidos.
- **JWT (JSON Web Tokens)**: Para gestionar la autenticación y proteger las rutas de administración.
- **EJS**: Motor de plantillas para renderizar las vistas en el servidor.
- **Tailwind CSS**: Para estilizar el frontend de manera eficiente.
- **Nodemon**: Para reiniciar el servidor automáticamente en desarrollo.
- **MongoDB Shell**: Para interactuar con la base de datos.

### Frontend:
- **Go**: Para gestionar las rutas y el servidor.
- **MongoDB**: Para gestionar los pedidos de los pingüinos.
- **CSS**: Para el estilizado del frontend.

## Instalación

### Backend
1. Clona este repositorio.
2. Navega a la carpeta del backend.
3. Instala las dependencias con `npm install`.
4. Ejecuta el servidor con `nodemon app.js` o `node app.js`.

### Frontend
1. Clona este repositorio.
2. Navega a la carpeta del frontend.
3. Ejecuta el servidor con `go run main.go`.

## Funcionalidades

### Panel de Administración (Backend)
- **Login**: Paula puede iniciar sesión utilizando un token JWT.
- **CRUD de productos**: Paula puede crear, leer, actualizar y eliminar productos.
- **Visualización de pedidos**: Paula puede ver todos los pedidos realizados por los pingüinos.

### Tienda Online (Frontend)
- **Mostrar productos**: Los pingüinos pueden ver todos los productos disponibles.
- **Crear pedidos**: Los pingüinos pueden realizar pedidos, enviando su dirección y seleccionando productos.

## Conclusión

Este proyecto cumple con todos los requisitos para gestionar una tienda online de pingüinos, permitiendo tanto a Paula como a los pingüinos realizar las acciones necesarias de manera eficiente y segura.
