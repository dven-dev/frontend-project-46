// Импорты в правильном порядке
import globals from 'globals'
import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'
import importPlugin from 'eslint-plugin-import'

// для __dirname и __filename в ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// совместимость с eslint.config.js (ранее .eslintrc)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
})

// экспорт Flat config-массива
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // ✅ node-глобальные переменные
        ...globals.jest, // ✅ jest-глобальные переменные (если используешь Vitest — можно убрать)
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.configs.recommended.rules,
    },
  },

  // Airbnb-база (совместимость)
  ...compat.extends('airbnb-base'),

  // Кастомные правила
  {
    rules: {
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__filename', '__dirname'],
        },
      ],
      'no-tabs': 'off',
      'no-console': 'off',
      'import/extensions': [
        'error',
        {
          js: 'always',
        },
      ],
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
]
