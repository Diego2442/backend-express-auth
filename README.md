# Backend Node.js con Express y Docker Compose

## Tecnologías utilizadas

- **Node.js**: Un entorno de ejecución para JavaScript en el servidor. Usamos Node.js para manejar las solicitudes HTTP y administrar la lógica de negocio de nuestra aplicación.
- **Express.js**: Un marco web minimalista para Node.js que facilita la creación de aplicaciones web y APIs RESTful.
- **Docker**: Usamos Docker para crear un contenedor que encapsula nuestra aplicación backend, lo que facilita su ejecución en diferentes entornos.
- **Docker Compose**: Herramienta que permite definir y ejecutar aplicaciones multi-contenedor. Usamos Docker Compose para orquestar el backend y otros servicios relacionados.
- **SonarQube**: Herramienta para el análisis de calidad del código. Usamos SonarQube para asegurarnos de que nuestro código cumpla con los estándares de calidad y no tenga errores o vulnerabilidades.
- **GitHub Actions**: Para automatizar el proceso de construcción, análisis y despliegue de la aplicación a un servidor EC2 en AWS.

## Instalación local

Para ejecutar este backend localmente utilizando Docker y Docker Compose, sigue los pasos a continuación.

### Requisitos previos

- Tener **Docker** y **Docker Compose** instalados en tu máquina local. Si no lo tienes, puedes instalarlo desde aquí:
  - [Instalar Docker](https://docs.docker.com/get-docker/)
  - [Instalar Docker Compose](https://docs.docker.com/compose/install/)
  
### Pasos para ejecutar el backend localmente

1. **Clonar el repositorio**:
   
   Clona el repositorio de tu proyecto en tu máquina local.

   ```bash
   git clone https://github.com/Diego2442/backend-express-auth.git
   cd tu-repositorio

   ```

# Variables de Entorno para el Backend

Para ejecutar el backend de manera local, asegúrate de tener un archivo `.env` en la raíz de tu proyecto con las siguientes variables de entorno:

```env
PORT=4000
JWT_SECRET=mi-secreto
DATABASE_URL=mi-url-de-base-de-datos
FRONTEND_URL=http://localhost:3000
```

# Ejecutar docker-compose
    ```bash
    docker-compose build
    docker-compose up
    ```

# Workflow de GitHub Actions: Construcción y Despliegue con SonarQube y Docker

Este archivo `.yml` define un flujo de trabajo automatizado para construir, analizar y desplegar una aplicación utilizando **SonarQube** para el análisis estático de código y **Docker Compose** para el despliegue en un servidor EC2. A continuación, te explico paso a paso cada parte del archivo:

## Resumen del Workflow

Este flujo de trabajo se ejecuta cuando se hace un `push` a la rama `main` del repositorio. Los pasos definidos en este flujo incluyen:
1. **Checkout del código**: Obtiene el código más reciente del repositorio.
2. **Análisis de código con SonarQube**: Realiza un análisis del código fuente utilizando SonarQube.
3. **Despliegue a EC2 con Docker Compose**: Conecta a un servidor EC2 y despliega la aplicación usando Docker Compose.
