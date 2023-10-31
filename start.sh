#!/bin/bash

cd $(dirname "$0")
source ./lib.sh
source ./.env

stopExistingContainers() {
    docker stop $ELASTICSEARCH_CONTAINER && docker rm $ELASTICSEARCH_CONTAINER
    docker stop $LOGSTASH_CONTAINER && docker rm $LOGSTASH_CONTAINER
    docker stop $MYSQL_CONTAINER && docker rm $MYSQL_CONTAINER
    docker stop $POSTGRES_CONTAINER && docker rm $POSTGRES_CONTAINER
	docker stop $KIBANA_CONTAINER && docker rm $KIBANA_CONTAINER
}

setupMySQL() {
    docker pull mysql/mysql-server
    docker run --name=$MYSQL_CONTAINER --env-file ./.env -p $MYSQL_PORT:3306 -d mysql/mysql-server
    while true; do
        if [ $(docker inspect --format '{{.State.Health.Status}}' $MYSQL_CONTAINER) = 'healthy' ]; then
            echo "mysql is healthy"
            break
        else
            echo "Command failed, retrying in 5 seconds..."
            sleep 5
        fi
    done
}

setupPostgres() {
    docker run --name $POSTGRES_CONTAINER --env-file ./.env -p $POSTGRES_PORT:5432 -d postgres
    sleep 5
}

generateProducts() {
	pnpm run generate-products
}

populateDataToDB() {
    node ./sequelize/postDataToDB.js
}

setupElasticSearch() {
    docker run -u root -v ./.dist:/bitnami/elasticsearch/storage/data:rw --name $ELASTICSEARCH_CONTAINER -p $ELASTICSEARCH_PORT:9200 -d bitnami/elasticsearch:latest
    fileContent=$(cat ./es/esStorageConfig.json)
    executeUntillSucceeds curl -X PUT localhost:"$ELASTICSEARCH_PORT"/_cluster/settings?pretty -H "Content-Type: application/json" -d "$fileContent"
}

setupLogstash(){
    docker run --env-file ./.env --name $LOGSTASH_CONTAINER --network host -v ./es/logstash.yml:/usr/share/logstash/pipeline/logstash.conf -d log-rdbms
    sleep 5
}

setupKibana() {
	docker run -d --name $KIBANA_CONTAINER  -p $KIBANA_PORT:5601 docker.elastic.co/kibana/kibana:8.10.4
}

stopExistingContainers
setupMySQL
setupPostgres
generateProducts
populateDataToDB
setupElasticSearch
setupLogstash
setupKibana
