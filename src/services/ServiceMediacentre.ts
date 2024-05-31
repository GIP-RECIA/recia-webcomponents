import { instance } from '@/utils/axiosUtils.ts';

const getResources = async (baseApiUrl: string) => {
  const response = await instance.get(`${baseApiUrl}`);
  console.log('ressources recuperées : ', response);
  return response;
};

const getFilters = async (baseApiUrl: string) => {
  const response = await instance.get(`${baseApiUrl}/filters`);
  console.log('les filtres reçu du back :', response);
  return response;
};

const getFavorites = async (baseApiUrl: string) => {
  const response = await instance.get(`${baseApiUrl}/favorites`);
  console.log('ressources favorites recuperées : ', response);
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
