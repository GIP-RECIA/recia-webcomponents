import { CustomError } from './CustomError';
import oidc, { type JWT } from '@uportal/open-id-connect';

const getToken = async (apiUrl: string): Promise<{ encoded: string; decoded: JWT }> => {
  const { encoded, decoded } = await oidc({
    userInfoApiUrl: apiUrl,
  });
  if (decoded.sub.startsWith('guest')) {
    throw new CustomError('You are not logged', 401);
  }
  return { encoded, decoded };
};

export { getToken };
