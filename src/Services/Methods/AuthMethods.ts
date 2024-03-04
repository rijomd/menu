import { api_Development } from "../Config/ApiConstants";
import crypto from 'crypto-js'

export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const AUTH_USER = "AUTH_USER";
export const ENCRYPT_USER_KEY = "RIJO-MENU-ENCRYPTION-PURPOSE";

export const getAuthToken = () => {
  return localStorage.getItem(ACCESS_TOKEN)
    ? "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    : "";
};

export const getMyAPiUrl = () => {
  return api_Development;
};

export const getAuthUser = () => {
  const selectedUser: any = localStorage.getItem(AUTH_USER);
  try {
    if (selectedUser) {
      const bytes = crypto.AES.decrypt(selectedUser, ENCRYPT_USER_KEY);
      const decryptedData = bytes.toString(crypto.enc.Utf8);
      if (!decryptedData) {
        throw new Error('Decrypted data is empty');
      }
      return JSON.parse(decryptedData);
    }
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
}

export const encryptUser = (data: any) => {
  try {
    const encryptedData = crypto.AES.encrypt(JSON.stringify(data), ENCRYPT_USER_KEY).toString();
    return encryptedData;
  } catch (error) {
    throw new Error("encryption error");
  }
}
