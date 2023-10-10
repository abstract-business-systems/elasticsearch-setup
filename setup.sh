#!/bin/bash

cd $(dirname "$0") 
source ./lib.sh

fileContent=$(cat .data.json)
node postData.js
docker stop es01 && docker rm es01
docker stop log-rdbms && docker rm log-rdbms
docker run -u root -v /home/nkg/dev/es/temp:/bitnami/elasticsearch/data:rw --name es01 --network host -d bitnami/elasticsearch:latest
executeUntillSucceeds curl -X PUT localhost:9200/_cluster/settings?pretty -H "Content-Type: application/json" -d "$fileContent"
docker run --env-file /home/nkg/dev/docker/logstash-db/env.txt --name log-rdbms --network host -v /home/nkg/dev/es/elasticsearch-config.yml:/usr/share/logstash/pipeline/logstash.conf -v /home/nkg/dev/docker/logstash-db/config/env.sh:/usr/share/logstash/vendor/jdbc/env.sh -d log-rdbms