# Установка зависимостей
install:
	npm install

# Проверка стиля кода
lint:
	npx eslint .

# Автоматическое исправление ошибок линтинга
lint-fix:
	npx eslint . --fix

# Запуск тестов
test:
	npm test

# Отчёт о покрытии тестами
coverage:
	npx jest --coverage

# Пример запуска утилиты
show:
	node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json --format stylish

# Публикация в npm
publish:
	npm publish

.PHONY: install lint lint-fix test coverage show publish



