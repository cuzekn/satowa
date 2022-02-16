module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    prettier,
  ],
  parser: [
    "@typescript-eslint/parser",
    "plugin:tailwindcss/recommended",
    "next/core-web-vitals",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "tailwindcss"],
  rules: {
    "react/prop-types": "off",
    "no-undef": "error",
    "react/tsx-props-no-spreading": "off",
    "@typescript-eslint/rule-name": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
