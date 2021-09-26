#!/bin/bash

# #creo el contenedor
docker run -d --name instancia$1 -p 500$1:5000 --net mynet --ip 119.18.0.$1 instanciaslab4