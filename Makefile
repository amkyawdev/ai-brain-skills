.PHONY: help install validate lint test build deploy clean

help:
	@echo "Available commands:"
	@echo "  make install   - Install dependencies"
	@echo "  make validate - Validate all skills"
	@echo "  make lint      - Lint skills"
	@echo "  make test      - Run tests"
	@echo "  make build     - Build skills"
	@echo "  make deploy    - Deploy skills"
	@echo "  make clean     - Clean build artifacts"

install:
	npm install

validate:
	npm run validate

lint:
	npm run lint

test:
	npm test

build:
	npm run build

deploy:
	bash scripts/deployment/deploy-to-claude.sh

clean:
	rm -rf dist/ coverage/ .cache/
