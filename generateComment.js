const fs = require("fs");

const inputFile = "apexScanResults.csv"; // Replace with your actual input file name
const outputFile = "violations.csv";

// Function to format violation message
function formatViolation(data) {
  return `> ${data.Problem}. **${data.File.split("/").pop()}** violates rule *${data.Rule}* on Line ${data.Line}, Column ${data.Column}`;
}

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const lines = data.split("\n");
  const headers = lines[0].split(",");

  const violations = lines.slice(1).map((line) => {
    const rowData = line.split(",");
    const violationData = {};

    headers.forEach((header, index) => {
      violationData[header.trim().split('"')[1]] = rowData[index]
        .trim()
        .split('"')[1];
    });
    return formatViolation(violationData);
  });

  const formattedData = "> [!WARNING]\n" + violations.join("\n");

  fs.writeFile(outputFile, formattedData, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log("Violation report generated successfully:", outputFile);
  });
});
