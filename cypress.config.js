const {defineConfig} = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
        },
        baseUrl: 'https://demo.fareharbor.com',
        video: true,
        defaultCommandTimeout: 8000,
        viewportWidth: 1880,
        viewportHeight: 1080,
    },
});
