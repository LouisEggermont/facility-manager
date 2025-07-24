// // @ts-check
// import eslint from '@eslint/js'
// // import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import globals from 'globals'
// import tseslint from 'typescript-eslint'

// export default tseslint.config(
//   {
//     ignores: ['eslint.config.mjs'],
//   },

//   eslint.configs.recommended,
//   ...tseslint.configs.recommendedTypeChecked,
//   // eslintPluginPrettierRecommended,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//       sourceType: 'commonjs',
//       parserOptions: {
//         project: 'tsconfig.json',
//         projectService: true,
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//   },
//   {
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-floating-promises': 'warn',
//       '@typescript-eslint/no-unsafe-argument': 'warn',
//     },
//   },
// )

// const { defineConfig, globalIgnores } = require('eslint/config')

// const tsParser = require('@typescript-eslint/parser')
// const typescriptEslintEslintPlugin = require('@typescript-eslint/eslint-plugin')
// const globals = require('globals')
// const js = require('@eslint/js')

// const { FlatCompat } = require('@eslint/eslintrc')

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
//   allConfig: js.configs.all,
// })

// module.exports = defineConfig([
//   {
//     languageOptions: {
//       parser: tsParser,
//       sourceType: 'module',

//       parserOptions: {
//         project: 'tsconfig.json',
//         tsconfigRootDir: __dirname,
//       },

//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//     },

//     plugins: {
//       '@typescript-eslint': typescriptEslintEslintPlugin,
//     },

//     extends: compat.extends('plugin:@typescript-eslint/recommended'),

//     rules: {
//       '@typescript-eslint/interface-name-prefix': 'off',
//       '@typescript-eslint/explicit-function-return-type': 'off',
//       '@typescript-eslint/explicit-module-boundary-types': 'off',
//       '@typescript-eslint/no-explicit-any': 'off',
//     },
//   },
//   globalIgnores(['**/.eslintrc.js']),
// ])

import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // ...eslint.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      // '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
]

// @ts-check
// import eslint from '@eslint/js'
// // import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import globals from 'globals'
// import tseslint from 'typescript-eslint'

// export default tseslint.config(
//   {
//     ignores: ['eslint.config.mjs'],
//   },

//   eslint.configs.recommended,
//   ...tseslint.configs.recommendedTypeChecked,
//   // eslintPluginPrettierRecommended,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.jest,
//       },
//       sourceType: 'commonjs',
//       parserOptions: {
//         projectService: true,
//         tsconfigRootDir: import.meta.dirname,
//       },
//     },
//   },
//   {
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-floating-promises': 'warn',
//       '@typescript-eslint/no-unsafe-argument': 'warn',
//       '@typescript-eslint/interface-name-prefix': 'off',
//       '@typescript-eslint/explicit-function-return-type': 'off',
//       '@typescript-eslint/explicit-module-boundary-types': 'off',
//     },
//   },
// )
