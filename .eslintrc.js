module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    //'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    //'prettier'
  ],
  rules: {
    "indent": 0,
    "no-restricted-syntax": [
      "error",
      "WithStatement",
      "BinaryExpression[operator='in']"
    ],
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "no-tabs": 0,
    "linebreak-style": 0
  },
};
