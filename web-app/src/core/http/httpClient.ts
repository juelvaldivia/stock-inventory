import axios, { AxiosInstance } from 'axios';

import HttpErrorHandler from '@/core/http/httpErrorHandler';

class HttpClient {
  private _headers = { 'Content-Type': 'application/json' };
  private _instance: AxiosInstance;

  constructor(baseURL: string, errorHandler: HttpErrorHandler = new HttpErrorHandler()) {
    this._instance = axios.create({ baseURL, headers: { ...this._headers } });
  }

  get instance(): AxiosInstance {
    return this._instance;
  }
}

export default HttpClient;
