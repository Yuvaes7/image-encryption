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
