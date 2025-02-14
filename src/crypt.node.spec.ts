import { describe, expect, it, beforeEach } from "vitest";
import { aesCrypt, IAesBundle } from "./crypt";
import { subtle, randomBytes, getRandomValues } from "crypto";
import { iv, jwk_key, test_payload } from "./mock_data.json";

describe("aesCrypt node", () => {
  it("should encrypt and decrypt data successfully", async () => {
    // Generate random data for each test
    // Generate a new AES bundle for each test
    const aesBundle = {
      iv: Buffer.from(iv, "base64"),
      key: await subtle.importKey("jwk", jwk_key, "AES-GCM", true, [
        "encrypt",
        "decrypt",
      ]),
    };
    // Encrypt the data
    const encryptedData = await aesCrypt(
      Buffer.from(test_payload),
      aesBundle,
      "encrypt",
    );

    // Try to decrypt the encrypted data
    const decryptedData = await aesCrypt(encryptedData, aesBundle, "decrypt");

    // convert back to string
    const decoded_payload = new TextDecoder().decode(decryptedData);

    expect(decoded_payload).toEqual(test_payload);
  });
});
