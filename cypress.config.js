const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://testes.autoforce.com.br/dealer-bmw-desafio",
    viewportWidth: 1366,
    viewportHeight: 768,
    screenshotOnRunFailure: true
  }
})
