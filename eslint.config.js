import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@eslint/config-prettier'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  {
    name: 'app/language-options',
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    name: 'app/custom-rules',
    rules: {
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['Login', 'Inventories', 'Members', 'Analytics'],
        },
      ],
    },
  },

  skipFormatting,
])
