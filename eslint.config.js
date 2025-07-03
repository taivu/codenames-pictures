import js from '@eslint/js'
import react from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  {
    ignores: [
      'build/**',
    ],
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
      ...react.configs.recommended.rules,
    },
    plugins: {
      react,
    }
  }
]