import sys
import google.generativeai as genai

# Ensure the API key is correct and safe
api_key = "AIzaSyAH3nXug262foRug7tPKQHePBXuImgOulM"
genai.configure(api_key=api_key)

generation_config = {
    "temperature": 0.0,        # Lower temperature reduces randomness
    "top_p": 1.0,              # Setting top_p to 1 disables nucleus sampling
    "top_k": 0,                # Setting top_k to 0 disables top-k sampling
    "max_output_tokens": 10000,
    "response_mime_type": "text/plain",
}

# Initialize the model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)
chat_session = model.start_chat(history=[])

# Retrieve command-line arguments
input_code = sys.argv[1]
input_language = sys.argv[2]
output_language = sys.argv[3]

expected_format = """
#include <stdio.h>
int main() {
  printf("hi\n");
  return 0;
}
"""

format = """
*****def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=' ')
        a, b = b, a + b
n_terms = 10
fibonacci(n_terms)
"""

# Create the prompt for code translation
code_t_prompt = f"""
Do not include any introductory sentences or additional information or.
Don't enclose it with any qoutes or backticks.
don't mention executing 'programming language name' also in the begining or the end like this 'executing python'.
Do not include any comments in the code.
Give me the best optimal plain code. 
I only want the code in response.

please start the code with "*****" irrespective of the language.
example code format: {format}
The below code is in {input_language} language convert it to {output_language} language.
\n\ncode: {input_code}\n\n 

"""

# Send the prompt to the model and get the response
code_t_response = chat_session.send_message(code_t_prompt)
code_t = code_t_response.text

delimiter = "*****"
code_part = code_t.split(delimiter, 1)[1]

print(code_part)


# Print the translated code
