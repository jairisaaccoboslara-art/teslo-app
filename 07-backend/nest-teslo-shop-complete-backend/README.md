<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

1. Clonar proyecto
2. `yarn install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno
5. Levantar la base de datos

```
docker-compose up -d
```

6. Levantar:

```
npm run start:dev
yarn start:dev

```

7. Ejecutar SEED

```
http://localhost:3000/api/seed
```

# Production notes:

primero
ir al docker-compose.yamal
en la terminal pongo 
docker compose down para detener los que estes corriendo y no tener problemas
si sale error de puerto verifico esto para ver si se esta usando el puerto que voy a usar
bind: address already in use
sudo lsof -i :5432
si aparece esto postgres   PID   postgres   (LISTEN) signifca que ese puerto esta ocupado
uso esto para detener posgrets sudo systemctl stop postgresql
y verifico con esto sudo lsof -i :5432
y levanto el docker: 
docker compose up -d --build
y luego inicio 
npm run start:dev
