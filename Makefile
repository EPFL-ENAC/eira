install:
	npm install
	$(MAKE) -C frontend install

dev-frontend:
	$(MAKE) -C frontend dev

test:
	$(MAKE) -C frontend test

lint:
	$(MAKE) -C frontend lint

run:
	docker-compose build --parallel --pull
	docker-compose up --remove-orphans
