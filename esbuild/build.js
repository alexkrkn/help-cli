import esbuild from 'esbuild';

export const esbuildConfig = {
  platform: 'node',
  target: 'node16',
  format: 'esm',
  bundle: true,
  entryPoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  packages: 'external',
};

try {
  await esbuild.build(esbuildConfig);
} catch (err) {
  process.exit(1);
}
