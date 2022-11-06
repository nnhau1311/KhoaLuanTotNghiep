import { STRING } from './../constants/String';
import { API_DOMAIN } from './../configs/apiConfig';
import axios from 'axios';
import Logger from '../log/index';
import { userData } from '../configs';

export async function get(path: string): Promise<any> {
  const config = {
    headers: {
      Authorization: 'Bearer ' + userData.token,
    },
  };
  let result = { error: false, message: '' };
  try {
    result = await axios.get(`${API_DOMAIN}/${path}`, config);
    // Logger.info(`API Result: ${result}`);
    return result;
  } catch (error: any) {
    Logger.error(`API Error: ${error}`);
    console.log('result1213', error.response.data);
    if (error?.response?.data?.StatusCode >= 500) {
      result.message = STRING.apiError;
      result.error = true;
    } else {
      result.message = error?.response?.data?.message[0];
      result.error = true;
    }
  }
  return result;
}

export async function post(path: string, data: any): Promise<any> {
  Logger.info(`API Fetching: ${API_DOMAIN}/${path}`);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userData.token,
    },
  };
  let result = { error: false, message: '' };
  try {
    result = await axios.post(`${API_DOMAIN}/${path}`, data, config);
    // Logger.info(`API Result: ${result}`);
    return result;
  } catch (error: any) {
    Logger.error(`API Error: ${error}`);
    console.log('result1213', error.response.data);
    if (error?.response?.data?.StatusCode >= 500) {
      result.message = STRING.apiError;
      result.error = true;
    } else {
      result.message = error?.response?.data?.message[0];
      result.error = true;
    }
  }
  return result;
}
export async function postAthen(path: string, data: any): Promise<any> {
  Logger.info(`API Fetching: ${API_DOMAIN}/${path}`);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let result = { error: false, message: '' };
  try {
    result = await axios.post(`${API_DOMAIN}/${path}`, data, config);
    // Logger.info(`API Result: ${result}`);
    return result;
  } catch (error: any) {
    Logger.error(`API Error: ${error}`);
    console.log('result1213', error.response.data);
    if (error?.response?.data?.StatusCode >= 500) {
      result.message = STRING.apiError;
      result.error = true;
    } else {
      result.message = error?.response?.data?.message[0];
      result.error = true;
    }
  }
  return result;
}

export async function postFrom(path: string, data: {}): Promise<any> {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const postData = Object.entries(data)
    .map((x: any) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&');

  return await axios
    .post(`${API_DOMAIN}/${path}`, postData, config)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
}

export async function uploadFile(path: string, data: any): Promise<any> {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  };
  return await axios.post(`${API_DOMAIN}/${path}`, data, config);
}

export type HttpData<T> = {
  data?: T;
  error?: string;
  message?: any;
};
