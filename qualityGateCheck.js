const fs = require("fs");
const outputFilePath = "./testResults/codeCoverageReadableFile.txt";

filename = "./testResults/test-result.json";

// Read the JSON file
fs.readFile(filename, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the JSON file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Extract coveredPercent values from coverage.coverage array
    const coveredPercents = jsonData.coverage.coverage.map(
      (item) => item.coveredPercent + ";" + item.name,
    );

    let result = "";
    for (const item of coveredPercents) {
      const [percentageStr, className] = item.split(";");
      const percentage = parseInt(percentageStr, 10);
      if (percentage < 85) {
        result += `Test Class ${className} has test coverage of ${percentage} which is less than specified Quality Gate.\n`;
      }
    }

    if (result.indexOf("Test Class") == -1) {
      result = "true";
    }

    // Write the result to the output file
    fs.writeFile(outputFilePath, result.trim(), "utf8", (err) => {
      if (err) {
        console.error("Error writing the result to the file:", err);
      } else {
        console.log(result.trim());
      }
    });
  } catch (parseErr) {
    console.error("Error parsing JSON data:", parseErr);
  }
});