import type { StructureDetail } from '@/types/structureType';
import oidc from '@uportal/open-id-connect';
import axios from 'axios';

const getToken = async (userInfoApiUrl: string): Promise<string | undefined> => {
  try {
    const { encoded, decoded } = await oidc({
      userInfoApiUrl: userInfoApiUrl,
    });
    return encoded;
  } catch (error) {
    console.error('error: ', error);
  }
};

const getParametab = async (url: string, userInfoApiUrl: string) => {
  return await axios.get(`${url}`, {
    headers: {
      Authorization: `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  });
};

const getDetailEtab = async (url: string) => {
  return await axios.get(`${url}`);
};

const updateEtab = async (url: string, details: StructureDetail, userInfoApiUrl: string) => {
  return await axios.put(`${url}`, `${JSON.stringify(details)}`, {
    headers: {
      Authorization: `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/json',
    },
  });
};

const uploadLogo = async (url: string, formData: FormData, userInfoApiUrl: string) => {
  return await axios.post(`${url}`, formData, {
    headers: {
      Authorization: `Bearer ${await getToken(userInfoApiUrl)}`,
    },
  });
};

export { getParametab, getDetailEtab, updateEtab, uploadLogo };
