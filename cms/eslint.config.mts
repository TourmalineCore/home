import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  {
    files: [`**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`],
    plugins: {
      js
    },
    extends: [`js/recommended`],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tseslint.parser,
      parserOptions: {
        project: `./tsconfig-lint.json`,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      quotes: [
        `error`,
        `backtick`,
        {
          'avoidEscape': true
        }
      ],
      indent: [
        `error`,
        2,
        {
          "SwitchCase": 1
        }
      ],
      "array-element-newline": [
        `error`,
        {
          "multiline": true,
          "minItems": 3
        }
      ],
      "array-bracket-newline": [
        `error`,
        {
          "multiline": true,
          "minItems": 3
        }
      ],
      "newline-per-chained-call": [
        `error`,
        {
          "ignoreChainWithDepth": 1
        }
      ],
      "no-prototype-builtins": `off`,
      "object-curly-newline": [
        `error`,
        {
          "ObjectExpression": {
            "multiline": true,
            "minProperties": 1
          },
          "ObjectPattern": {
            "multiline": true,
            "minProperties": 1
          },
          "ExportDeclaration": {
            "multiline": true,
            "minProperties": 1
          }
        }
      ],
      "func-names": 0,
      "no-console": `error`,
      "no-plusplus": 0,
      "no-return-assign": 0,
      "no-param-reassign": 0,
      "no-unused-vars": `off`,
      "no-restricted-syntax": [`error`, `BinaryExpression[operator='in']`],
      "class-methods-use-this": 0,
      "default-param-last": `off`,
      "import/prefer-default-export": 0,
      "import/no-extraneous-dependencies": 0,
      "import/no-default-export": 0,
      "unicorn/prevent-abbreviations": `off`,
      "unicorn/no-array-for-each": `off`,
      "no-underscore-dangle": 0,
      "max-len": [
        `error`,
        {
          "code": 180,
          "comments": 200
        }
      ],
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  globalIgnores([
    `types/`,
    `dist/`,
    `.strapi/`
  ])
])

