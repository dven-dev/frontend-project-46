# Gendiff

> Утилита для сравнения двух конфигурационных файлов (JSON/YAML) с поддержкой выходных форматов: **Stylish (по умолчанию)**, **Plain text** и **JSON**.

---

### Hexlet tests and linter status

[![Actions Status](https://github.com/dven-dev/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/dven-dev/frontend-project-46/actions)
[![Node CI](https://github.com/dven-dev/frontend-project-46/actions/workflows/test.yml/badge.svg)](https://github.com/dven-dev/frontend-project-46/actions/workflows/test.yml)
[![Maintainability](https://qlty.sh/badges/16633dfc-1f68-4f5f-bde2-7ce93d9bf3e0/maintainability.svg)](https://qlty.sh/gh/dven-dev/projects/frontend-project-46)
[![Code Coverage](https://qlty.sh/badges/16633dfc-1f68-4f5f-bde2-7ce93d9bf3e0/test_coverage.svg)](https://qlty.sh/gh/dven-dev/projects/frontend-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=dven-dev_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=dven-dev_frontend-project-46)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=dven-dev_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=dven-dev_frontend-project-46)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=dven-dev_frontend-project-46&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=dven-dev_frontend-project-46)

---

## Системные требования

- Node.js **v14.0.0** или выше
- npm (обычно устанавливается вместе с Node.js)

---

## Установка

```bash
git clone https://github.com/dven-dev/frontend-project-46.git
cd frontend-project-46
make install
```

---

## Доступные команды

| Команда                            | Описание                                     |
| ---------------------------------- | -------------------------------------------- |
| `gendiff -h`                       | Показать справочную информацию               |
| `gendiff <file1> <file2>`          | Сравнение в формате `stylish` (по умолчанию) |
| `gendiff -f plain <file1> <file2>` | Сравнение в формате `plain`                  |
| `gendiff -f json <file1> <file2>`  | Сравнение в формате `json`                   |
| `make test`                        | Запуск тестов                                |
| `make lint`                        | Проверка кода линтером                       |

---

## Примеры использования (Asciinema)

- Сравнение **JSON-файлов**
  https://asciinema.org/a/zKb4LRxc7cLjn4qFLiq3Jxe8e

- Сравнение **YAML-файлов**
  https://asciinema.org/a/7HzChf6WQcfjHwIRoS2N8ZY2B

- Сравнение **JSON и YAML**
  https://asciinema.org/a/7d0K8lgd1LIMZLdfvqRVfD8X0

- Формат вывода: **plain**
  https://asciinema.org/a/aFm3LbAYfxLTN2e1lANbR3KGs

- Формат вывода: **json**
  https://asciinema.org/a/Cnc7QFZUSre8Plr7ElXdh6Gma

---

## Структура проекта

```
.
├── bin/                  # CLI-файл
├── src/                  # Исходный код
│   ├── formatters/       # Форматеры (stylish, plain, json)
│   ├── parsers.js        # Поддержка YAML/JSON
│   ├── buildDiff.js      # Основная логика сравнения
│   └── index.js          # Главная точка входа
├── __tests__/            # Тесты
├── __fixtures__/         # Тестовые данные
└── Makefile              # Сценарии сборки и запуска
```

---

## Покрытие тестами

- ✔ Покрытие юнит-тестами через **Jest**
- ✔ Проверка через **ESLint**
- ✔ Статический анализ на **Code Climate Quality**
