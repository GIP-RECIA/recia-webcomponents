import { instance } from '@/utils/axiosUtils.ts';

const getResources = async (baseApiUrl: string, userInfoApiUrl: string) => {
  await instance.get(baseApiUrl);
};

const addFavorite = async (baseApiUrl: string, userInfoApiUrl: string, idRessource: string) => {
  await instance.post(`${baseApiUrl}/favorite/${idRessource}`, null);
};

const removeFavorite = async (baseApiUrl: string, userInfoApiUrl: string, idRessource: string) => {
  await instance.delete(`${baseApiUrl}/favorite/${idRessource}`);
};

export { getResources, addFavorite, removeFavorite };
