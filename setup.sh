#!/bin/bash

cd $(dirname "$0") 
source ./lib.sh

node postDataToPg.js
docker stop es01
docker stop logstash-container
docker rm es01
docker rm logstash-container
docker run --name es01 --network host -d bitnami/elasticsearch:latest
executeUntillSucceeds curl -X PUT localhost:9200/_cluster/settings?pretty -H "Content-Type: application/json" -d ' { "transient": { "cluster.routing.allocation.disk.watermark.low": "10gb", "cluster.routing.allocation.disk.watermark.high": "7gb", "cluster.routing.allocation.disk.watermark.flood_stage": "2gb" } } '
docker run --name logstash-container --network host -v /home/nkg/dev/es/elasticsearch-config.yml:/usr/share/logstash/pipeline/logstash.conf -d cytechmobile/logstash-postgres:latest

