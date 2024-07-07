const fs = require("fs");
const outputFilePath = "./testResults/codeCoverageReadableFile.txt";
const xml2js = require("xml2js");

const codeCoverage = "./testResults/test-result.json";
const package = "/modified-files/package/package.xml";

// Read the JSON file
fs.readFile(codeCoverage, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the JSON file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Extract coveredPercent values from coverage.coverage array
    const coveredPercents = jsonData.coverage.coverage.map(
      (item) => item.coveredPercent + ";" + item.name
    );

    // Read the package.xml to verify which class or trigger is present in the current branch
    fs.readFile(__dirname + "" + package, (err, data) => {
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

        let classToCheckCodeCoverage = "";
        let apexClasses = result.Package.types;
        const regex = /test/i;
        for (let value of apexClasses) {
          if (value.name == "ApexClass" || value.name == "ApexTrigger") {
            let classNames = value.members;
            for (let name of classNames) {
              if (!regex.test(name)) {
                classToCheckCodeCoverage += name + ";";
              }
            }
          }
        }

        let qualityCheckResult = "";
        for (const item of coveredPercents) {
          const [percentageStr, className] = item.split(";");
          const percentage = parseInt(percentageStr);
          if (
            percentage < 85 &&
            classToCheckCodeCoverage.indexOf(className) != -1
          ) {
            qualityCheckResult += `Test Class ${className} has test coverage of ${percentage}% which is less than specified Quality Gate.\n`;
          }
        }

        if (qualityCheckResult.indexOf("Test Class") == -1) {
          qualityCheckResult = "true";
        }

        // Write the result to the output file
        fs.writeFile(
          outputFilePath,
          qualityCheckResult.trim(),
          "utf8",
          (err) => {
            if (err) {
              console.error("Error writing the result to the file:", err);
            } else {
              console.log(qualityCheckResult.trim());
            }
          }
        );
      });
    });
  } catch (parseErr) {
    console.error("Error parsing JSON data:", parseErr);
  }
});
