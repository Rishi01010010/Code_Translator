document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('translateForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const translateButton = document.getElementById('translateButton');
        translateButton.disabled = true;
        translateButton.innerText = 'Translating...';

        const inputCode = document.getElementById('inputCode').value;
        const inputLanguage = document.getElementById('inputLanguage').value;
        const outputLanguage = document.getElementById('outputLanguage').value;

        console.log('Form submitted. Preparing to send data:', { inputCode, inputLanguage, outputLanguage });

        const formData = new URLSearchParams();
        formData.append('input_code', inputCode);
        formData.append('input_language', inputLanguage);
        formData.append('output_language', outputLanguage);

        try {
            const req = await fetch('/translate', {
                method: 'POST',
                body: formData
            });

            if (req.ok) {
                const result = await req.text();
                document.getElementById('translatedCode').value = result;
                console.log('Translation successful:', result);
            } else {
                console.error('Error during translation:', req.statusText);
                alert(`Error: ${req.statusText}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please try again later.');
        } finally {
            translateButton.disabled = false;
            translateButton.innerText = 'Translate';
        }
    });
});

function copyCode(button) {
    var textArea = button.parentElement.nextElementSibling;
    
    // Select the text in the textarea
    textArea.select();

    // Copy the text to the clipboard using the Clipboard API
    navigator.clipboard.writeText(textArea.value)
        .then(() => {
            button.focus();
            setTimeout(() => {
                button.blur();
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}


console.lo("completed");