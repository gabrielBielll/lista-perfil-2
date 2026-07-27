import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'tmp_color'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Framer Motion é usado diretamente no JSX; sem o plugin React ele não
      // é reconhecido pelo no-unused-vars padrão.
      'no-unused-vars': ['error', { varsIgnorePattern: '^(motion|[A-Z_])' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['src/__tests__/**/*.{js,jsx}', 'src/__tests__/setup.js'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, afterEach: 'readonly' },
    },
  },
]
