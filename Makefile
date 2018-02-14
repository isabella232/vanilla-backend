
run:
		docker-compose up --build

database:
		docker-compose run --rm --service-ports database

test:
		docker-compose run -d --service-ports --name vanilla-test-db database
		NODE_ENV=test npm test; docker stop vanilla-test-db && docker rm vanilla-test-db
