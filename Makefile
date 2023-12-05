install:
	npm install
	$(MAKE) -C frontend install

dev-frontend:
	$(MAKE) -C frontend dev

test:
	$(MAKE) -C frontend test

lint:
	$(MAKE) -C frontend lint

run-local:
	docker-compose build --parallel --pull
	docker-compose up --remove-orphans

run:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up --pull=always -d --remove-orphans