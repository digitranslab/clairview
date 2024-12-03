#!/bin/bash
id=$(docker run -t -d -p 8080:80 clairview:latest)
docker exec -it $id bash
docker kill $id
