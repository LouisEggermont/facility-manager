// eslint.config.mjs
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      // adjusting rules to allow for more flexibility in the codebase
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
)
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
