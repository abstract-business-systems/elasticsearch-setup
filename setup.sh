#!/bin/bash

cd $(dirname "$0") 
source ./lib.sh

populateDataToDb() {
    node postData.js
}
haltExistingContainers() {
    docker stop es01 && docker rm es01
    docker stop log-rdbms && docker rm log-rdbms
}
setupElasticSearch() {
    docker run -u root -v ./storage/data:/bitnami/elasticsearch/storage/data:rw --name es01 --network host -d bitnami/elasticsearch:latest
    fileContent=$(cat esStorageConfig.json)
    executeUntillSucceeds curl -X PUT localhost:9200/_cluster/settings?pretty -H "Content-Type: application/json" -d "$fileContent"
}
setupLogstash(){
    docker run --env-file ./.env --name log-rdbms --network host -v ./elasticsearch-config.yml:/usr/share/logstash/pipeline/logstash.conf -d log-rdbms
}

populateDataToDb
haltExistingContainers
setupElasticSearch
setupLogstash