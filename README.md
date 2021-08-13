# Docker_NodeJS

# correr el dockerfile
docker build -t agenda:v1 .

# Crear contenedor
docker run -it -p 3000:3000 -v /workspace/Docker_NodeJS/Agenda:/Agenda --name agenda -h agenda agenda:v1