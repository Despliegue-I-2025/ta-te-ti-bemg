#!/bin/bash

# Script para construir y ejecutar el contenedor Docker de Ta-Te-Ti BEMG

echo "Construyendo imagen Docker"
docker build -t ta-te-ti-bemg .

if [ $? -eq 0 ]; then
    echo "Imagen construida exitosamente"
    
    echo "Ejecutando contenedor"
    docker run -d -p 3009:3009 --name ta-te-ti-server ta-te-ti-bemg
    
    if [ $? -eq 0 ]; then
        echo "Contenedor ejecutándose en puerto 3009"
        echo "Servidor disponible en: http://localhost:3009"
        echo "Para ver logs: docker logs ta-te-ti-server"
        echo "Para detener: docker stop ta-te-ti-server"
        echo "Para eliminar: docker rm ta-te-ti-server"
    else
        echo "Error al ejecutar contenedor"
    fi
else
    echo "Error al construir imagen"
fi
