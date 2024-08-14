import { defineConfig } from "cypress";

export default defineConfig({
  trashAssetsBeforeRuns: true, // Delete previous assets (screenshots, videos) before each run
  screenshotOnRunFailure: true, // Take a screenshot on test failure
  screenshotsFolder: 'cypress/screenshots', // Folder to store screenshots
  videosFolder: 'cypress/videos', // Folder to store videos
  video: true, // Disable video recording

  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Single slash and correct pattern for test files
    testIsolation: false, // Disable test isolation between tests
    defaultCommandTimeout: 10000, // Set default command timeout to 10 seconds
    hideXHRInCommandLog: true, // Hide XHR requests from the command log
    env: {
      httpUrl: 'https://jsonplaceholder.typicode.com/posts',
      postUrl: 'https://reqres.in/',
      booksUrl: 'https://simple-books-api.glitch.me/'
    },
    setupNodeEvents(on, config) {
      // Node event listeners can be added here
    },
  },
});
