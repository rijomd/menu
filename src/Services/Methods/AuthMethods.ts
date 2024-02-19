import { api_Development } from "../Config/ApiConstants";
import crypto from 'crypto-js'

export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const AUTH_USER = "AUTH_USER";
export const ENCRYPT_USER_KEY = "RIJO-MENU-ENCRYPTION-PURPOSE";
export const INITIALIZATION_VECTOR = "SAMPLE12345";

export const getAuthToken = () => {
  return localStorage.getItem(ACCESS_TOKEN)
    ? "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    : "";
};

export const getMyAPiUrl = () => {
  return api_Development;
};

export const getAuthUser = () => {
  if (localStorage.getItem(AUTH_USER)) {
    const selectedUser: any = localStorage.getItem(AUTH_USER);
    const decryptedBytes = crypto.AES.decrypt(selectedUser, ENCRYPT_USER_KEY);
    const decryptedData = JSON.parse(decryptedBytes.toString(crypto.enc.Utf8));
    return decryptedData;
  }
  else {
    return ''
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
