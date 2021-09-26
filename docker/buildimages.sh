docker build -t instanciaslab4 .
docker network create --subnet=119.18.0.0/16 mynet

docker run -d --name instancia2 -p 5002:5000 --net mynet --ip 119.18.0.2 instanciaslab4
docker run -d --name instancia3 -p 5003:5000 --net mynet --ip 119.18.0.3 instanciaslab4