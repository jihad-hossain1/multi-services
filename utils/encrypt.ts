import CryptoJS from "crypto-js";

// Key and IV setup (you can use a fixed key or a generated one)
const key = CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef");  // 256-bit key (use a secure key in production)
const iv = CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210");  // 128-bit IV (use a secure IV in production)

// Encryption function
export const secret_encrypt = (text: string) => {
    const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv, mode: CryptoJS.mode.CTR });
    return { iv: iv.toString(CryptoJS.enc.Hex), encryptedData: encrypted.toString() };
};

// Decryption function
export const secret_decrypt = (ivHex: any, encryptedData: string) => {
    const iv = CryptoJS.enc.Hex.parse(ivHex); // Convert IV from hex to CryptoJS format
    const decrypted =  CryptoJS.AES.decrypt(encryptedData, key, { iv: iv, mode: CryptoJS.mode.CTR });
    return decrypted.toString(CryptoJS.enc.Utf8); // Convert decrypted data back to a UTF-8 string
};
