const fs = require('fs');
const xml2js = require('xml2js');

async function extractTests(){
    const runTestsString = '';
    fs.readFile(__dirname + '/build.xml', (err, data) => {
        if (err) {
            console.error('Error reading XML file:', err);
            return;
        }
    
        // Parse the XML data
        xml2js.parseString(data, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                return;
            }
    
            // Extract the values of runTest tags
            const runTests = result.TestSuite.runTest;
            runTestsString = runTests.join(', ');  // Combine values into a single string

            console.log(runTestsString);
        });
    });

    let testsFile = __dirname+'/testsToRun.txt';
    await fs.promises.writeFile(testsFile,'all');

    await fs.promises.writeFile(testsFile,tests);
    await fs.promises.appendFile(testsFile,'\n');
}


extractTests();
