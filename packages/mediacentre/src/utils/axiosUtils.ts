import { CustomError } from './CustomError';
import { getToken } from './soffitUtils';
import axios from 'axios';

const isDev: boolean = import.meta.env.DEV;

const instance = axios.create({
  timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
});

let token: string | undefined;

const initToken = async (apiUrl: string): Promise<void> => {
  try {
    const {
      encoded,
      decoded: { exp, iat, sub },
    } = await getToken(apiUrl);
    token = `Bearer ${encoded}`;
    const timeout = (exp - iat) * 1000 * 0.75;

    // relance la methode a interval regulier
    setInterval(async () => {
      try {
        const {
          encoded,
          decoded: { sub },
        } = await getToken(apiUrl);
        token = `Bearer ${encoded}`;

        // vite detecte l'env
        if (isDev) console.debug('Token has been renewed');
      } catch (es: any) {
        console.error('Unable to renew token', es);
        throw new CustomError(es.message, es.statusCode);
      }
    }, timeout);
  } catch (e: any) {
    throw new CustomError(e.message, e.statusCode);
  }
};

instance.interceptors.request.use(async (config) => {
  config.headers['Authorization'] = token;
  return config;
});

export { instance, initToken };
