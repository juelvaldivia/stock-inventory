import axios, { AxiosInstance, AxiosResponse } from 'axios';
import HttpErrorHandler from './httpErrorHandler';

class HttpClient {
  private _headers = { 'Content-Type': 'application/json' };
  private _errorHandler: HttpErrorHandler;
  private _instance: AxiosInstance;

  constructor(baseURL: string, errorHandler: HttpErrorHandler = new HttpErrorHandler()) {
    this._errorHandler = errorHandler;
    this._instance = axios.create({ baseURL, headers: { ...this._headers } });
  }

  get instance(): AxiosInstance {
    return this._instance;
  }
}

export default HttpClient;
