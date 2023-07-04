# 实现 answer streaming
import os
import sys

import openai  # for OpenAI API calls
import time  # for measuring time duration of API calls

# openai.api_key = <API-KEY>
# or set the environment variable OPENAI_API_KEY=<API-KEY>)

# test: python3 openai_api.py "Count to 100, with a comma between each number and no newlines. E.g., 1, 2,"
openai.api_key = os.getenv("OPENAPI_KEY")

def buildMsg():
    argv = sys.argv[1:]
    msg = [{"role": "system", "content": "You are a helpful assistant."}]
    for idx in range(len(argv)):
        if idx % 2 == 1:
            msg.append(buildOneMsg("system", argv[idx]))
        else:
            msg.append(buildOneMsg("user", argv[idx]))
    return msg

def buildOneMsg(role, content):
    return {"role": role, "content": content}

response = openai.ChatCompletion.create(
    model='gpt-3.5-turbo',
    messages=buildMsg(),
    temperature=0.2,
    stream=True
)

for chunk in response:
    try:
        # print(chunk)
        print(chunk['choices'][0]['delta']['content'], end='')
        sys.stdout.flush()
    except KeyError:
        pass
