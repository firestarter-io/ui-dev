/*
 * Firestarter.io
 *
 * Copyright (C) 2020 Blue Ohana, Inc.
 * All rights reserved.
 * The information in this software is subject to change without notice and
 * should not be construed as a commitment by Blue Ohana, Inc.
 *
 */

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "prettier", "@typescript-eslint"],
  rules: {
    // indent: ['warning', 'tab'],
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/aria-role": [0],
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/no-static-element-interactions": [0],
    // 	'member-access': [0],
    // 	'no-empty-interface': 'off',
    "import/no-unresolved": "off",
    "react/button-has-type": [0],
    "no-underscore-dangle": "off",
    // 	'dot-notation': 'off',
    // 	'interface-name': [0, 'never-prefix'],
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx", ".ts"] },
    ],
    "import/order": [1],
    "react/destructuring-assignment": [0],
    // 	'react/prefer-stateless-function': [1, { ignorePureComponents: true }],
    // 	'react/prop-types': [0],
    "import/extensions": "off",
    "@typescript-eslint/no-var-requires": [0],
    "@typescript-eslint/ban-ts-comment": [0],
    // 	'prettier/prettier': ['error'],
    // 	'react/require-default-props': [0],
    // 	'react/no-unused-prop-types': [0],
    // 	'react/no-array-index-key': [0],
    // 	'react/jsx-props-no-spreading': [0],
    // 	'react/default-props-match-prop-types': [0],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "no-shadow": [0],
    "@typescript-eslint/ban-types": "off",
    camelcase: [0],
    // 	'@typescript-eslint/no-non-null-assertion': 'off',
    "import/prefer-default-export": [0],
    // 	'import/no-extraneous-dependencies': [
    // 		'error',
    // 		{
    // 			devDependencies: ['**/*.test.ts', '**/*.test.tsx', '**/setupTests.ts'],
    // 		},
    // 	],
    // 	'@typescript-eslint/no-empty-function': [0],
    "no-plusplus": [0],
    "no-console": [0],
    // 	'no-underscore-dangle': [0],
    // },
    // settings: {
    // 	react: {
    // 		createClass: 'createReactClass',
    // 		pragma: 'React',
    // 		version: 'detect',
    // 		flowVersion: 'detect',
    // 	},
    // 	propWrapperFunctions: [
    // 		'forbidExtraProps',
    // 		{ property: 'freeze', object: 'Object' },
    // 		{ property: 'myFavoriteWrapper' },
    // 	],
  },
};
