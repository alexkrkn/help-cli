#!/usr/bin/env node
import meow from 'meow';
import { renderCli, config } from './cli.jsx';
import { CONFIG_KEY_API_KEY, CONFIG_KEY_MODEL } from './cli.jsx';

const cli = meow(`
	Usage
	  $ help-cli

	Options
	  --help,    -h  Show help
	  --version, -v  Show version
	  --config,  -c  Show the config path
	  --reset,   -r  Reset the config so the next run will recreate it

`, {
  importMeta: import.meta,
  flags: {
    config: {
      type: 'boolean',
      shortFlag: 'c'
    },
    reset: {
      type: 'boolean',
      shortFlag: 'r'
    }
  }
});

const main = async () => {
  try {
    renderCli();
  } catch (e) {
    console.error(e);
  }
};

if (cli.flags.config) {
  console.log(config.path);
} else if (cli.flags.reset) {
  config.set(CONFIG_KEY_API_KEY, '');
  config.set(CONFIG_KEY_MODEL, '');
  console.log('Config was reset');
} else {
  main();
}