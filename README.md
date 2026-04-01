Agenda de Contactos

Este proyecto es una aplicación web que gestiona contactos, permitiendo crear, listar, buscar y eliminar contactos.
Esta hecha usando docker para la base de datos, nestjs para el backend y nextjs para el frontend.

Como correr el proyecto


1) Levantar la Base de Datos

1. Abri la terminal en la carpeta principal 
2. Ejecuta el siguiente comando:
   docker compose up -d

2) Levantar el Backend

1. Abri una nueva terminal en la carpeta del backend
2. instala las dependencias con esto:
   ```bash
   npm install
   ```
3. Deberia de haber un archivo .env por que hice que lo suba tambien, pero si no tenes que crearlo con estos datos:
   DATABASE_URL="postgresql://test:test@localhost:5432/test?schema=public"

5. Sincroniza la estructura de la base de datos usando Prisma:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
6. Encende el servidor del backend:
   ```bash
   npm run start:dev
   ```

3) levantar el Frontend

1. Abri una otra terminal en la carpeta del frontend
2. instala las dependencias necesarias con:
 ```bash
   npm install 
```

3. Inicia:
   ```bash
   npm run dev
   ```

#Uso de la Aplicación

1. Una vez que el Backend y el Frontend estén corriendo simultáneamente, abri el navegador.
2. anda a http://localhost:3001` (o el puerto indicado por la terminal).
3. Listo , podes: Crear nuevos contactos, Listar todos los contactos de la base de datos, Buscar contactos por su ID específico y Eliminar contactos permanentemente.
