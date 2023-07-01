import * as os from 'node:os';

const getOsName = () => {
  let osName = os.type();
  if (osName === 'Darwin') {
    osName = 'mac';
  } else if (osName === 'Linux') {
    osName = 'linux';
  } else if (osName === 'Windows_NT') {
    osName = 'windows';
  } else {
    osName = 'mac';
  }
  return osName;
}

export const PROMPT_SYSTEM = `
- I will tell you below which cli task I want to accomplish and you will provide the cli command and also explain it
- Assume a ${getOsName()} operating system.
`;

export const PROMPT_USER_RESPONSE = `
- Return a json object ONLY
- Do not return anything else besides the json object, no explanation, no extra text, no headers, no notes, nothing else
- The json object should have the following attributes, and nothing else:
  1. 'command' - the cli command that accomplishes the task (a string)
  2. 'explanation' - the explanation of the command, in markdown (a string)
  3. 'error' - an error message if you cannot understand the task or if there is any other error (a string)
- if you cannot complete the task, return the json object with the 'error' attribute set to a string explaining why
- Here is an example of a valid json object response:

{
  "command": "ls -l",
  "explanation": "The \`ls\` command lists the files in the current directory. The \`-l\` flag tells \`ls\` to use the long format, which includes the file permissions, the number of links, the owner, the group, the size, the date, and the filename. The long format is useful for seeing detailed information about the files in the current directory.",
  "error": ""
}

- Here is an example of a valid json object response, when you encounter an error:

{
  "command": "",
  "explanation": "",
  "error": "I cannot complete the task because I do not understand it."
}

- return only ONE json object per response, never more than one
- answer only the latest question of the user, do not answer previous questions

The Json object response:
`;