/**
 * Encrypt or decrypt an ArrayBuffer using AES-256 (AES-GCM).
 * @param {ArrayBuffer} data - Source to encrypt or decrypt.
 * @param {IAesBundle} aes - AES iv/CryptoKey set. Must match encryption AES set that was used.
 * @param {'encrypt' | 'decrypt'} mode - Toggle between encryption and decryption.
 * @returns {Promise<ArrayBuffer>} - Processed result.
 * @private
 */
export async function aesCrypt(
  data: ArrayBuffer,
  aes: IAesBundle,
  mode: "encrypt" | "decrypt",
): Promise<ArrayBuffer> {
  try {
    const algo = {
      name: "AES-GCM",
      iv: aes.iv,
    };
    if (data.byteLength < 1) {
      return new ArrayBuffer(0);
    } else if (mode?.toLowerCase() === "encrypt") {
      try {
        return await crypto.subtle.encrypt(algo, aes.key, data);
      } catch (err) {
        console.warn("encrypt");
        throw err;
      }
    } else {
      try {
        return await crypto.subtle.decrypt(algo, aes.key, data);
      } catch (err) {
        console.warn("decrypt");
        throw err;
      }
    }
  } catch (err) {
    console.error("aesCrypt", err);
    throw err;
  }
}

export interface IAesBundle {
  iv: Uint8Array;
  key: CryptoKey;
}
