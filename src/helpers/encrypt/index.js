import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

export function encryptContent(payload) {
  var randomString = uuidv4().toString().replace(/-/gi, "");
  var secretKey = process.env.REACT_APP_SECRET_KEY;
  let key = randomString + secretKey;
  key = CryptoJS.SHA512(key);
  console.log(payload);

  key = key.toString();
  key = key.substring(32, 64);
  let encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    CryptoJS.enc.Utf8.parse(key),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return randomString + encrypted.toString();
}
