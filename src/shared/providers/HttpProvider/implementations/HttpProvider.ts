import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import { IHttpProvider } from '../models/IHttpProvider';

class HttpProvider implements IHttpProvider {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
  }

  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.get(url, config);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch data from ${url}: ${(error as Error).message}`,
      );
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.post(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to post data to ${url}: ${(error as Error).message}`,
      );
    }
  }

  async put<T>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.post(
        url,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to post data to ${url}: ${(error as Error).message}`,
      );
    }
  }
}

export default HttpProvider;
