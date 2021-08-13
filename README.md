# Docker_NodeJS

# correr el dockerfile
docker build -t agenda:v1 .

# Crear contenedor
docker run -it -p 3000:3000 -v /workspace/Docker_NodeJS/Agenda:/Agenda --name agenda -h agenda agenda:v1

$env:GOOGLE_APPLICATION_CREDENTIALS="/workspace/Docker_NodeJS/Agenda/agenda2-1930b-firebase-adminsdk-wv3ia-21e2881362.json"

export GOOGLE_APPLICATION_CREDENTIALS="/workspace/Docker_NodeJS/Agenda/agenda2-1930b-firebase-adminsdk-wv3ia-21e2881362.json"

/workspace/Docker_NodeJS/Agenda/agenda2-1930b-firebase-adminsdk-wv3ia-21e2881362.json