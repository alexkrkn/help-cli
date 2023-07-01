import esbuild from 'esbuild';
import { esbuildConfig } from './build.js';

esbuildConfig.sourcemap = true;
esbuildConfig.outdir = './dist-dev';
esbuildConfig.minify = false;

try {
  await esbuild.build(esbuildConfig);
} catch (err) {
  process.exit(1);
}
