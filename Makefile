update:
	npx npm-check-updates

start:
	npx webpack serve

install:
	npm ci

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

test:
	npm test