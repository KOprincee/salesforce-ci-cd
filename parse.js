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
      const runTests = result.TestSuite.runTest;
      runTestsString = runTests.join(","); // Combine values into single string

      process.env.APEX_TESTS = runTestsString;
      console.log(runTestsString);
    });
  });
}

extractTests();
