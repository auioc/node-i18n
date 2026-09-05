import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
    {
        ignores: ['dist/'],
    },
    {
        files: ['src/**/*.ts'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            jsdoc.configs['flat/recommended-typescript'],
            importPlugin.flatConfigs.recommended,
            prettierRecommended,
        ],
        settings: {
            'import/resolver': {
                typescript: {
                    bun: true,
                    typescript: true,
                },
            },
            jsdoc: {
                mode: 'typescript',
            },
        },
        rules: {
            'prettier/prettier': 'warn',

            'import/no-unresolved': 'off',
            'import/no-relative-packages': 'error',
            'import/no-absolute-path': 'error',
            'import/no-mutable-exports': 'error',
            'import/no-amd': 'error',
            'import/no-commonjs': 'error',
            'import/no-import-module-exports': 'error',
            'import/newline-after-import': 'warn',

            'jsdoc/no-undefined-types': 'error',
            'jsdoc/require-jsdoc': 'off',
            'jsdoc/require-param': 'off',
            'jsdoc/require-returns': 'off',

            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/explicit-member-accessibility': [
                'warn',
                { accessibility: 'no-public' },
            ],

            'no-control-regex': 'off',
            'block-scoped-var': 'error',
            'no-empty': ['warn', { allowEmptyCatch: true }],
        },
    }
);
