export default [{ languageOptions: { ecmaVersion: 2022, sourceType: "script", globals: { window: "readonly", document: "readonly", console: "readonly", localStorage: "readonly", React: "readonly", ReactDOM: "readonly" }}, rules: { "no-unused-vars": "warn", "no-console": "off", "no-undef": "error" }}];

// Configuração adicional para arquivos HTML
export const htmlConfig = {
  files: ["**/*.html"],
  languageOptions: {
    parser: "@eslint/js",
    globals: {
      window: "readonly",
      document: "readonly", 
      console: "readonly",
      React: "readonly",
      ReactDOM: "readonly"
    }
  },
  rules: {
    "no-unused-vars": "off",
    "no-undef": "off"
  }
};
