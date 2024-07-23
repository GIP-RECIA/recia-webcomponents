import { CustomError } from '@/utils/CustomError';
import { instance } from '@/utils/axiosUtils.ts';
import { getToken } from '@/utils/soffitUtils';

const flushMediacentreFavorites = async (putUrl: string, fname: string) => {
  await instance.put(`${putUrl}${fname}`, { mediacentreFavorites: [] });
};

const getResources = async (baseApiUrl: string, groupsApiUrl: string) => {
  try {
    const resp = await instance.get(groupsApiUrl);

    const regexGroups = new RegExp('^.*:(admin|Inter_etablissements|Etablissements|Applications):.*$');

    const userGroups = new Array<string>();
    resp.data.groups.forEach((element: any) => {
      if (regexGroups.test(element.name)) {
        userGroups.push(element.name);
      }
    });

    const response = await instance.post(baseApiUrl, { isMemberOf: userGroups });
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

const getFavorites = async (getUserFavoriteResourcesUrl: string, fnameMediacentreUi: string) => {
  try {
    const response = await instance.get(`${getUserFavoriteResourcesUrl}${fnameMediacentreUi}`);
    return response.data;
  } catch (e: any) {
    throw new CustomError(e.response.data.message, e.response.status);
  }
};

const putFavorites = async (
  putUserFavoriteResourcesUrl: string,
  idResource: string,
  isFavorite: boolean,
  resourceFavoriteIds: string[],
  fnameMediacentreUi: string,
) => {
  try {
    let res: Array<String> = [];
    if (isFavorite) {
      res = resourceFavoriteIds.length > 0 ? [...resourceFavoriteIds, idResource] : [idResource];
    } else {
      res = resourceFavoriteIds.filter((id) => id !== idResource);
    }

    const response = await instance.put(`${putUserFavoriteResourcesUrl}${fnameMediacentreUi}`, {
      mediacentreFavorites: res,
    });

    return response.data;
  } catch (e: any) {
    throw new CustomError(e.response.data.message, e.response.status);
  }
};

export { getResources, getFilters, getFavorites, putFavorites, flushMediacentreFavorites };
