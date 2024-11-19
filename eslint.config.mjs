import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import prettierConfig from 'eslint-plugin-prettier/recommended'
import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

const patchedConfig = fixupConfigRules([
  ...compat.extends('next/core-web-vitals')
])

const config = [
  ...patchedConfig,
  ...ts.configs.recommended,
  prettierConfig,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'none',
          bracketSpacing: true,
          jsxBracketSameLine: false,
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          endOfLine: 'auto'
        }
      ]
    }
  },
  { ignores: ['.next/*'] }
]

export default config
