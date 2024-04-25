import { instance } from '@/utils/axiosUtils.ts';

const getResources = async (baseApiUrl: string) => {
  return await instance.get(baseApiUrl);
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

const getFilters = async (baseApiUrl: string) => {
  return await instance.get(`${baseApiUrl}/filtres`);
};

export { getResources, addFavorite, removeFavorite, getFilters };
