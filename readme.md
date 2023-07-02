# help-cli

Do you often forget the different options and flags of various cli tools?

`help-cli` is a cli tool to help you come up with the exact cli commands.

You enter a description of what you want to accomplish, and it will use GPT to generate the exact command and explain it to you.

It is open source, and uses your own OpenAI key.

[Video](https://youtu.be/pOda6TDBqcY)

[Blog Post](https://www.undefinedapps.com/post/use-chatgpt-ffmpeg-cli-commands-nodejs)

## Install

`$ npm i -g help-cli`

On first run, it will ask you for your OpenAI api key.

## Usage

run:

`$ help-cli`

## More Options

Reset your config file, so that the initial setup will run again:

`$ help-cli --reset`

See where on your system the config file was stored:

`$ help-cli --config`

## Developing

Install dependencies:

`$ npm i`

To run the dev build locally (with sourcemaps):

`$ npm start`

To run the production build:

`$ npm run build`

## License

MIT
