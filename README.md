Here’s a detailed guide for installing and using the image encryption CLI tool, which you can include in your README file on GitHub.

---

# Image Encryption CLI Tool

This project provides a command-line interface (CLI) tool for encrypting and decrypting images using Node.js. The tool ensures that images are securely encrypted and can only be decrypted with a specific key.

## Features

- Encrypt images to prevent unauthorized access.
- Decrypt images using a provided key.
- Simple CLI interface for ease of use.

## Installation

To get started, follow these steps:

### Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)

### Clone the Repository

First, clone the repository from GitHub:

```sh
 git clone https://github.com/Yuvaes7/image-encryption.git
cd imcrypt
```

### Install Dependencies

Install the necessary dependencies:

```sh
npm install
```

### Install Globally

To use the CLI tool globally, install the package globally:

```sh
npm install -g .
```

This will make the `imcrypt` command available globally on your system.

## Usage

### Encrypt an Image

To encrypt an image, use the following command:

```sh
imcrypt -e /path/to/input.png -i /path/to/encrypted.png -p /path/to/key.txt
```

- `-e /path/to/input.png`: The path to the original image you want to encrypt.
- `-i /path/to/encrypted.png`: The path where the encrypted image will be saved.
- `-p /path/to/key.txt`: The path where the encryption key and IV will be saved.

Example:

```sh
imcrypt -e /home/user/images/input.png -i /home/user/images/encrypted.png -p /home/user/images/key.txt
```

### Decrypt an Image

To decrypt an image, use the following command:

```sh
imcrypt -d /path/to/encrypted.png -k /path/to/key.txt -i /path/to/decrypted.png
```

- `-d /path/to/encrypted.png`: The path to the encrypted image.
- `-k /path/to/key.txt`: The path to the file containing the key and IV.
- `-i /path/to/decrypted.png`: The path where the decrypted image will be saved.

Example:

```sh
imcrypt -d /home/user/images/encrypted.png -k /home/user/images/key.txt -i /home/user/images/decrypted.png
```

## Development

### Project Structure

- `index.js`: Main entry point of the CLI tool.
- `utils/encrypt.js`: Contains the encryption logic.
- `utils/decrypt.js`: Contains the decryption logic.

### Scripts

- `npm start`: Run the CLI tool.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.

---

### Example `package.json` File

```json
{
  "name": "imcrypt",
  "version": "0.0.1",
  "description": "An image encryption node-js CLI",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "bin": {
    "imcrypt": "./index.js"
  },
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "commander": "^8.0.0"
  }
}
```

### Example `.gitignore` File

```plaintext
node_modules
.DS_Store
```

### Example `index.js` File

```javascript
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
```

### Example `utils/encrypt.js` File

```javascript
const fs = require('fs');
const crypto = require('crypto');

function encrypt(inputImagePath, outputImagePath, outputKeyPath) {
  const algorithm = 'aes-256-ctr';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const input = fs.readFileSync(inputImagePath);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

  fs.writeFileSync(outputImagePath, encrypted);
  fs.writeFileSync(outputKeyPath, `${key.toString('hex')}:${iv.toString('hex')}`);

  console.log('Image encrypted successfully.');
}

module.exports = encrypt;
```

### Example `utils/decrypt.js` File

```javascript
const fs = require('fs');
const crypto = require('crypto');

function decrypt(inputImagePath, keyPath, outputImagePath) {
  const algorithm = 'aes-256-ctr';
  const [keyHex, ivHex] = fs.readFileSync(keyPath, 'utf8').split(':');
  const key = Buffer.from(keyHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');

  const input = fs.readFileSync(inputImagePath);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(input), decipher.final()]);

  fs.writeFileSync(outputImagePath, decrypted);

  console.log('Image decrypted successfully.');
}

module.exports = decrypt;
```

This comprehensive guide should help users install, set up, and use the image encryption CLI tool. You can copy this into your `README.md` file on GitHub.
