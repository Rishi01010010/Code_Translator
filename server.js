const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/translate', async (req, res) => {
    console.log("POST /translate route accessed");

    const { input_code: inputCode, input_language: inputLanguage, output_language: outputLanguage } = req.body;

    console.log('Received data:', { inputCode, inputLanguage, outputLanguage });

    const scriptPath = "D:\\Code Translator\\translate.py";

    const options = {
        mode: 'text',
        pythonOptions: ['-u'], // Disable output buffering
        pythonPath: 'python', // Example path to Python executable, adjust as needed
        args: [inputCode, inputLanguage, outputLanguage]
    };

    console.log("start");

    try {
        let results = await PythonShell.run(scriptPath, options);

        if (!results || results.length === 0) {
            console.error('No output received from Python script');
            return res.status(500).send('No output received from Python script');
        }
    
        const translatedCode = results.join('\n').trim();
        console.log('Python script output:', translatedCode);
        res.send(translatedCode);
    } catch (err) {
        console.error('Error executing Python script:', err);
        res.status(500).send('Error during translation');
    }

    console.log("end");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
