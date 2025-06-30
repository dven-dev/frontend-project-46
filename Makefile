install:
	npm install

lint:
	npx eslint .

test:
	npm test

coverage:
	npx jest --coverage

show:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json --format stylish
	
publish:
	npm publish	
	
.PHONY: test


