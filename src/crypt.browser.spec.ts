import { describe, expect, it, beforeEach } from "vitest";
import { aesCrypt, IAesBundle } from "./crypt";
import { iv, test_payload, jwk_key } from "./mock_data.json";

describe("aesCrypt browser", () => {
  it("should encrypt and decrypt data successfully", async () => {
    // Generate random data for each test
    // Generate a new AES bundle for each test
    const aesBundle: IAesBundle = {
      iv: Uint8Array.from(atob(iv), (c) => c.charCodeAt(0)),
      key: await crypto.subtle.importKey("jwk", jwk_key, "AES-GCM", true, [
        "encrypt",
        "decrypt",
      ]),
    };
    // Encrypt the data
    const encryptedData = await aesCrypt(
      Uint8Array.from(test_payload, (c) => c.charCodeAt(0)),
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
