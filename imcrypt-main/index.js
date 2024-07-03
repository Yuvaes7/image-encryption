#!/usr/bin/env node

const { program } = require('commander');
const encrypt = require('./utils/encrypt');
const decrypt = require('./utils/decrypt');

program
  .version('0.0.1')
  .description('An image encryption node-js CLI')
  .option('-e, --encrypt <image>', 'The image to encrypt')
  .option('-d, --decrypt <image>', 'The image to decrypt')
  .option('-c, --clear', 'Clear the console', false)
  .option('--noClear', "Don't clear the console", true)
  .option('-k, --key <key>', 'The key to use for decryption', false)
  .option('-i, --outputImageFileName <filename>', 'The output image file name')
  .option('-p, --outputKeyFileName <filename>', 'The output key file name')
  .parse(process.argv);

const options = program.opts();

if (options.encrypt) {
  if (!options.outputImageFileName || !options.outputKeyFileName) {
    console.error('Please provide both output image file name and output key file name.');
    process.exit(1);
  }
  encrypt(options.encrypt, options.outputImageFileName, options.outputKeyFileName);
}

if (options.decrypt) {
  if (!options.key || !options.outputImageFileName) {
    console.error('Please provide both key and output image file name.');
    process.exit(1);
  }
  decrypt(options.decrypt, options.key, options.outputImageFileName);
}
