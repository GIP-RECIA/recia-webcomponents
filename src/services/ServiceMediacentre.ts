import { CustomError } from '@/utils/CustomError';
import { instance } from '@/utils/axiosUtils.ts';
import { getToken } from '@/utils/soffitUtils';
import { ref } from 'vue';

// a supprimer quand l'api sera disponible
const idResourceFavoritesExample = ref<Array<string>>([]);

const initFav = () => {
  const ids = ['ark:/34885/wr0000001', 'ark:/23258/1537944382', 'ark:/54037/lmnd222r17sm'];
  ids.forEach((id) => idResourceFavoritesExample.value.push(id));
};
// ----------------------------------------------------------------

const getResources = async (baseApiUrl: string, groupsApiUrl: string) => {
  try {
    const { decoded } = await getToken(groupsApiUrl);
    const response = await instance.post(`${baseApiUrl}`, { isMemberOf: decoded.isMemberOf });
    return response;
  } catch (e: any) {
    if (e.response) {
      throw new CustomError(e.response.data.message, e.response.status);
    } else {
      throw new CustomError(e.message, e.statusCode);
    }
  }
};

const getFilters = async (baseApiUrl: string) => {
  try {
    const response = await instance.get(`${baseApiUrl}/filters`);
    return response;
  } catch (e: any) {
    throw new CustomError(e.response.data.message, e.response.status);
  }
};

const getFavorites = async (resourceFavoritesApiUrl: string) => {
  // a supprimer quand l'api sera disponible
  const response = idResourceFavoritesExample.value;
  // --------------------------------

  // a décommenter quand l'api sera disponible
  // try{
  // const response = await instance.get(resourceFavoritesApiUrl);
  return response;
  // }catch(e: any){
  //   throw new CustomError(e.response.data.message, e.response.status);
  // }
};

const addFavorite = async (resourceFavoritesApiUrl: string, idRessource: string) => {
  // à supprimer quand l'api sera disponible
  idResourceFavoritesExample.value.push(idRessource);
  const response = idResourceFavoritesExample.value;
  // --------------------------------

  // à décommenter quand l'api sera disponible, à modifier si besoin
  // try{
  //   const response = await instance.post(`${resourceFavoritesApiUrl}`,
  //   { idRessource : idRessource});
  return response;
  // }catch(e: any){
  //   throw new CustomError(e.response.data.message, e.response.status);
  // }
  // --------------------------------
};

const removeFavorite = async (resourceFavoritesApiUrl: string, idRessource: string) => {
  // à supprimer quand l'api sera disponible
  idResourceFavoritesExample.value = idResourceFavoritesExample.value.filter((id) => id !== idRessource);
  const response = idResourceFavoritesExample.value;
  // --------------------------------

  // à décommenter quand l'api sera disponible, à modifier si besoin
  // try{
  //   const response = await instance.delete(`${resourceFavoritesApiUrl}/${idRessource}`);
  return response;
  // }catch(e: any){
  //   throw new CustomError(e.response.data.message, e.response.status);
  // }
  // --------------------------------
};

export { getResources, getFilters, getFavorites, addFavorite, removeFavorite, initFav };
