# develoment 

Pasos para levantar la app en desarrollo 

1. levantar la vase de datos
docker compose up -d

2. Renombrar el .env.tempate a .env
3. Remplazar las variables de entorno
4. Ejecutar el comando npm install
5. Ejecutar el comando npm run dev
6. Ejecutar estos comandos 

npx prisma migrate dev 
npx prisma generate

7. Ejecutar el SEED para (crear la baase d edatos local(localhost:3000/aì/seed))

# prisma comandos
npx prisma init
npx prisma migrate dev
npx prisma generate