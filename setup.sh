#!/bin/bash

cd $(dirname "$0")
source ./lib.sh
source ./.env

setupMysql() {
    docker pull mysql/mysql-server
    docker run --network host --name=mysql1 --env-file ./.env -d mysql/mysql-server
    while true; do        
        if [ $(docker inspect --format '{{.State.Health.Status}}' mysql1) = 'healthy' ]; then
            echo "mysql is healthy"
            break
        else
            echo "Command failed, retrying in 5 seconds..."
            sleep 5
        fi
    done
}

setupPostgres() {
    docker run --name psql --env-file ./.env -p 5431:5432 -d postgres
    sleep 5
}

populateDataToDb() {
    node ./sequelize/postDataToDB.js
}

stopExistingContainers() {
    docker stop es01 && docker rm es01
    docker stop log-rdbms && docker rm log-rdbms
    docker stop mysql1 && docker rm mysql1
    docker stop psql && docker rm psql
}

setupElasticSearch() {
    docker run -u root -v ./storage/tmp:/bitnami/elasticsearch/storage/data:rw --name es01 --network host -d bitnami/elasticsearch:latest
    fileContent=$(cat ./es/esStorageConfig.json)
    executeUntillSucceeds curl -X PUT localhost:9200/_cluster/settings?pretty -H "Content-Type: application/json" -d "$fileContent"
}

setupLogstash(){
    docker run --env-file ./.env --name log-rdbms --network host -v ./es/elasticsearch-config.yml:/usr/share/logstash/pipeline/logstash.conf -d log-rdbms
}

stopExistingContainers
setupMysql
setupPostgres
populateDataToDb
setupElasticSearch
setupLogstash
