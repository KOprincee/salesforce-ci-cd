const fs = require("fs");
const xml2js = require("xml2js");

async function extractTests() {
  let runTestsString = "";
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

      // Extract the values of runTest tags
      const runTests = result.TestSuite.runTest;
      runTestsString = runTests.join(", "); // Combine values into a single string

      fs.writeFile("ApexTests.txt", runTestsString, (err) => {
        if (err) {
          console.log("Error writing test class to file:" + err);
          return;
        }
        console.log("Completed Finding Test Class");
      });
      process.env.APEX_TESTS = runTestsString;
      console.log(runTests);
    });
  });
}

extractTests();
