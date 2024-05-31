import { getToken } from './soffitUtils.ts';
import axios from 'axios';
import throttle from 'lodash.throttle';

const instance = axios.create({
  timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
});

let token: string | undefined;
let timeout: number | undefined;
let renewToken: any;

const init = async () => {
  try {
    const {
      encoded,
      decoded: { exp, iat },
    } = await getToken();
    token = `Bearer ${encoded}`;
    timeout = (exp - iat) * 750;
    renewToken = throttle(async () => {
      try {
        const { encoded } = await getToken();
        token = `Bearer ${encoded}`;
      } catch (e) {
        console.error('Something unexpected has occured while renewing the token', e);
      }
    }, timeout);
  } catch (e) {
    console.error('Something unexpected has occured while getting the token', e);
  }
};

instance.interceptors.request.use(async (config) => {
  if (!timeout) await init();
  else await renewToken();
  config.headers['Authorization'] = token;

  return config;
});

const errorHandler = (e: any): void => {
  if (axios.isAxiosError(e)) {
    console.error(e.message);
  } else if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error(e);
  }
};

export { instance, errorHandler };
