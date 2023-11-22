import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const PASSWORD_TOKEN = process.env.ENCRYPTION_TOKEN as string;

// Function to derive a key and initialization vector (IV) from a password
function deriveKeyAndIV(password: string, salt: Buffer): { key: Buffer, iv: Buffer } {
  const key = scryptSync(password, salt, 32); 
  const iv = randomBytes(16); 
  return { key, iv };
}

// Function to encrypt text
export function encryptText(text: string): string {
  const salt = randomBytes(16);
  const { key, iv } = deriveKeyAndIV(PASSWORD_TOKEN, salt);

  const cipher = createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  const result = `${salt.toString('hex')}:${iv.toString('hex')}:${encrypted}`;
  return result;
}

// Function to decrypt text
export function decryptText(encryptedText: string): string {
  const [saltHex, ivHex, encryptedPayload] = encryptedText.split(':');
  const salt = Buffer.from(saltHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const key = deriveKeyAndIV(PASSWORD_TOKEN, salt).key;

  const decipher = createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedPayload, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');

  return decrypted;
}


