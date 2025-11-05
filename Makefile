.PHONY: install start-backend start-frontend docker-build docker-up docker-down clean

install:
	cd backend && npm install
	cd frontend && npm install

start-backend:
	cd backend && npm start

start-frontend:
	cd frontend && npm start

docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

clean:
	rm -rf backend/node_modules
	rm -rf frontend/node_modules
	rm -rf frontend/build
	docker-compose down -v

test:
	cd backend && npm test
	cd frontend && npm test

deploy-aws:
	cd terraform && terraform init && terraform apply

destroy-aws:
	cd terraform && terraform destroy
