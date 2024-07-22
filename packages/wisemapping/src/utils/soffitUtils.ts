import oidc, { type JWT } from '@uportal/open-id-connect';
import { jwtDecode } from 'jwt-decode';

let userInfoApiUrl: string;

const setUserInfoApiUrl = (url: string): void => {
  userInfoApiUrl = url;
};

const getJwt = async (): Promise<{ encoded: string; decoded: JWT }> => {
  const { encoded, decoded } = await oidc({ userInfoApiUrl });

  return { encoded, decoded };
};

const parseJwt = (token: string): JWT => jwtDecode(token);

export { setUserInfoApiUrl, getJwt, parseJwt };
