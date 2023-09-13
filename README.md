# Cypress implementation example project

[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

## Setting Up

### Install Cypress

To install Cypress for Mac, Linux, or Windows, then [get started](https://on.cypress.io/install).

    npm install cypress --save-dev

[ You can also follow these instructions to install Cypress.](https://on.cypress.io/guides/installing-and-running#section-installing)

If you have any issues with the installation, I recommend you follow
the [troubleshooting guide.](https://docs.cypress.io/guides/references/troubleshooting)

### Start Tests

    ## install the node_modules
    
    npm install
    
    ## run the tests
    
    npm run cyrun 
    
    ## or use for debug:

    npm run cyopen

## Possible Improvements

- Put the project inside a Docker container, make a docker compose file, and start tests parallelly in different
  browsers;
- Add allure to human-readable reports;
- Add the base test file and put the before function inside. It will be possible to implement some other common function
  inside that class and reuse it in all test suites;
- Some functions in the pages' folder can be rewritten to be reused in more cases. (e.g., in activity.js, edit calendar
  functions to make them able to choose any day and year);
- Migrate to typescript to avoid some issues during development;
- Add the linter to follow the code style agreements;
- Add environment-dependable configuration to allow tests to start on different environments;
- Add 'each' keyword for the payment failure test suite and check different card numbers;
- Change some .css selectors (add the data-test-id attribute to all required elements on a page);

