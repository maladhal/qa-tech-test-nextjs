How to Run

    To run all tests in terminal run the following ;-

        npx playwright test 

    To run with the Playwright UI ;-

        npx playwright test --ui

    To run API subset of tests ;-

        npx playwright test --project=API

    To run GUI subset of tests ;-

        npx playwright test --project=GUI

Improvements
- did try out a BDD layer and VS plugin but found it a bit clunky. Test functions are small also and understandable so would keep an eye to see if more abstraction is warranted in the shape of BDD -- 

another abstraction is to use csv and drive your tests with data, strong case for doing this on the PUT tests. I would add a Object Factor to create a test per csv but too much for this test exercise. e.g. 

test.describe('CSV PUT tests', () => {
  testCases.forEach((testData) => {
    test logic
  }
}
would need another function to populate testdata first.