/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

import { useNotify } from "Services/Hook/useNotify";
import { api_Development } from "../Config/ApiConstants";
import { getAuthToken, encryptUser } from "../Methods/AuthMethods";

type RequestHeaders = {
  [key: string]: string;
};
type Params = {
  headers: RequestHeaders;
  method: string;
};
type MyPromise<T> = Promise<{ data: T }>;

export const requestMethod = async (
  url: string,
  data: any,
  method: string
): MyPromise<any> => {

  const baseUrl: string = `${api_Development}/${url}`;
  const headers: RequestHeaders = {
    "Content-Type": "application/json",
  };

  if (getAuthToken()) {
    headers["Authorization"] = getAuthToken();
  }

  const requestOptions: Params = {
    headers: headers,
    method: method,
  };

  return await axios({ ...requestOptions, url: baseUrl, data })
    .then((response: any) => {
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error: any) => {
      return {
        status: error.status,
        data: error.response,
      };
    });
};

const instance = axios.create({
  baseURL: api_Development,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Credentials": true,
    "Accept": "application/json",
    Authorization: getAuthToken()
  }
});

const cancelTokenSource = axios.CancelToken.source();
instance.defaults.cancelToken = cancelTokenSource.token;

export const cancelRequests = (reason: any) => {
  cancelTokenSource.cancel(reason);
};

export const isCancel = (error: any) => {
  return axios.isCancel(error);
};

export const fetchApi = async (body: any, url: string, method: string, isNeedToast?: boolean) => {
  try {
    const encryptedCredentials = encryptUser(body);
    let response: any;
    switch (method.toLowerCase()) {
      case 'get':
        response = await instance.get(url);
        break;
      case 'post':
        response = await instance.post(url, { encryptedCredentials });
        break;
      default:
        throw new Error('Invalid HTTP method');
    }

    if (response?.statusText !== "OK") {
      throw new Error(`HTTP error! Status: ${response?.status || "590"}`);
    }
    if (isNeedToast) {
      useNotify(response?.data.message || "Success", "success");
    }
    return response.data.data;
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw "Request cancelled!";
    }
    useNotify(error.response?.data.message || "Something Wrong!", "error");
    throw error.response?.data.message || "Something Wrong!";
  }

}

export default instance;