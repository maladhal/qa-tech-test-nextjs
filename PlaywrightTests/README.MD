*Disclaimer I've not used Playwright before so would optimise my approach more as I use it and learn (better design patterns)*

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

ToDo
Could add more tests but i think you just want to see a framework not an exhaustive set of tests for a demo app. That app is too open ended. e.g. you could be here writing tests super long strings going in on the front end of back end but I would suggest defending against both and testing the defence works rather than adding a test here with super long strings(i.e. test 400 char max instead of the sever limit as my laptop cant take it also).