import service from './base';
import type { AxiosRequestConfig } from 'axios';

const { VITE_APP_TIMEOUT } = import.meta.env;

export const httpGet = (opts: AxiosRequestConfig) => {
  return service({
    method: 'get',
    url: opts.url,
    params: opts.data
  });
};

export const httpGetDownload = (opts: AxiosRequestConfig) => {
  return service({
    method: 'get',
    url: opts.url,
    responseType: 'arraybuffer',
    params: opts.data
  });
};

export const httpDownload = (opts: AxiosRequestConfig) => {
  return service({
    method: 'get',
    url: opts.url,
    responseType: 'blob',
    params: opts.data
  });
};

export const httpPost = (opts: AxiosRequestConfig) => {
  const onUploadProgress = opts.onUploadProgress || function () {};
  return service({
    method: 'post',
    url: opts.url,
    data: opts.data,
    timeout: opts.timeout || VITE_APP_TIMEOUT,
    onUploadProgress
  });
};

export const httpPostDownload = (opts: AxiosRequestConfig) => {
  return service({
    method: 'post',
    url: opts.url,
    responseType: 'arraybuffer',
    data: opts.data
  });
};

export const httpPut = (opts: AxiosRequestConfig) => {
  return service({
    method: 'put',
    url: opts.url,
    data: opts.data
  });
};

export const httpDelete = (opts: AxiosRequestConfig) => {
  return service({
    method: 'delete',
    url: opts.url,
    data: opts.data
  });
};

export const httpDeleteParam = (opts: AxiosRequestConfig) => {
  return service({
    method: 'delete',
    url: opts.url,
    params: opts.data
  });
};

export const httpPostParam = (opts: AxiosRequestConfig) => {
  return service({
    method: 'post',
    url: opts.url,
    params: opts.data
  });
};

export const httpPostParamData = (opts: AxiosRequestConfig) => {
  return service({
    method: 'post',
    url: opts.url,
    data: opts.data,
    params: opts.params
  });
};

export const httpPutParam = (opts: AxiosRequestConfig) => {
  return service({
    method: 'put',
    url: opts.url,
    params: opts.data
  });
};

export default {
  httpGet,
  httpGetDownload,
  httpDownload,
  httpPost,
  httpPostDownload,
  httpPut,
  httpDelete,
  httpDeleteParam,
  httpPostParam,
  httpPostParamData,
  httpPutParam
};
