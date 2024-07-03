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
