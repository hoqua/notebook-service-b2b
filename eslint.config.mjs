import reactPlugin from 'eslint-plugin-react'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
export default [
  prettierConfig,
  {
    ...reactPlugin.configs.flat.recommended,
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      prettier,
      react: reactPlugin
    },
    rules: {
      'react/prop-types': 0,
      'space-before-function-paren': 'off',
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
  }
]
