const { createLogger, format, transports } = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://localhost:9200' });

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.colorize(),
		format.timestamp(),
		format.printf(({ timestamp, level, message }) => `[${ timestamp }] ${ level }: ${ message }`),
	),
	transports: [
		new transports.Console(),
		new ElasticsearchTransport({
			level: 'info',
			client: client,
			index: 'winston',
		}),
	],
});

logger.info('This is a log message.');
