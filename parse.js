const fs = require("fs");
const xml2js = require("xml2js");
let runTestsString = "";
async function extractTests() {
  fs.readFile(__dirname + "/build.xml", (err, data) => {
    if (err) {
      console.error("Error reading XML file:", err);
      return;
    }
    // Parse the XML data
    xml2js.parseString(data, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return;
      }

      // Extract the values of runTest tag
      const runTests = result.APEX_TESTS.runTest;
      runTestsString = runTests.join(","); // Combine values into a single string

      process.env.TestClasses = runTestsString;
      console.log(runTestsString);
    });
  });
}

extractTests();
