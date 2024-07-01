import { CustomError } from '@/utils/CustomError';
import { instance } from '@/utils/axiosUtils.ts';
import { getToken } from '@/utils/soffitUtils';

const getResources = async (baseApiUrl: string, groupsApiUrl: string) => {
  try {
    const { decoded } = await getToken(groupsApiUrl);
    const response = await instance.post(`${baseApiUrl}`, { isMemberOf: decoded.isMemberOf });
    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new CustomError(e.response.data.message, e.response.status);
    } else if (e.code === 'ECONNABORTED') {
      throw new CustomError(e.message, e.code);
    }
  }
};

const getFilters = async (baseApiUrl: string) => {
  try {
    const response = await instance.get(`${baseApiUrl}/filters`);
    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new CustomError(e.response.data.message, e.response.status);
    } else if (e.code === 'ECONNABORTED') {
      throw new CustomError(e.message, e.code);
    }
  }
};

const getFavorites = async (baseApiUrl: string) => {
  try {
    const response = await instance.get(`${baseApiUrl}/favorites`);
    return response.data;
  } catch (e: any) {
    throw new CustomError(e.response.data.message, e.response.status);
  }
};

const addFavorite = async (baseApiUrl: string, idRessource: string) => {
  try {
    const response = await instance.post(`${baseApiUrl}/favorites`, { idRessource: idRessource });
    return response.data;
  } catch (e: any) {
    throw new CustomError(e.response.data.message, e.response.status);
  }
};

const removeFavorite = async (baseApiUrl: string, idRessource: string) => {
  try {
    const response = await instance.delete(`${baseApiUrl}/favorites/${idRessource}`);
    return response.data;
  } catch (e: any) {
    throw new CustomError(e.response.data.message, e.response.status);
  }
};

export { getResources, getFilters, getFavorites, addFavorite, removeFavorite };
