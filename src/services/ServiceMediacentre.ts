import { CustomError } from '@/utils/CustomError';
import { instance } from '@/utils/axiosUtils.ts';
import { getToken } from '@/utils/soffitUtils';

const getResources = async (baseApiUrl: string, groupsApiUrl: string) => {
  try {
    const { decoded } = await getToken(groupsApiUrl);
    const response = await instance.post(`${baseApiUrl}`, { isMemberOf: decoded.isMemberOf });
    return response;
  } catch (e: any) {
    throw new CustomError(e.message, e.statusCode);
  }
};

const getFilters = async (baseApiUrl: string) => {
  const response = await instance.get(`${baseApiUrl}/filters`);
  return response;
};

const getFavorites = async (baseApiUrl: string) => {
  const response = await instance.get(`${baseApiUrl}/favorites`);
  return response;
};

const addFavorite = async (baseApiUrl: string, idRessource: string) => {
  const response = await instance.post(`${baseApiUrl}/favorite/${idRessource}`, null);
  if (response.status === 200) {
    return true;
  } else {
    throw new Error("Erreur lors de l'ajout de la ressource à vos favoris");
  }
};

const removeFavorite = async (baseApiUrl: string, idRessource: string) => {
  const response = await instance.delete(`${baseApiUrl}/favorite/${idRessource}`);
  if (response.status === 200) {
    return true;
  } else {
    throw new Error("Erreur lors de la suppression de la ressource de vos favoris, la ressource n'a pas été trouvée");
  }
};

export { getResources, getFavorites, addFavorite, removeFavorite, getFilters };
