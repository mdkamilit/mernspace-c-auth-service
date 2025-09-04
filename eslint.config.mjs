// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
   eslint.configs.recommended,
   tseslint.configs.recommendedTypeChecked,
   {
      ignores: ['dist', 'node_modules', 'eslint.config.mjs', 'jest.config.cjs'],
   },
   {
      languageOptions: {
         parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname,
         },
      },
      rules: {
         // 'no-console': 'error',
         // 'dot-notation': 'error',
         '@typescript-eslint/no-unused-promises': 'off',
          "@typescript-eslint/no-unsafe-assignment": "warn",
  "@typescript-eslint/no-unsafe-call": "warn",
  "@typescript-eslint/no-unsafe-member-access": "warn",
  "@typescript-eslint/no-unsafe-argument": "warn",
      },
   },
);
