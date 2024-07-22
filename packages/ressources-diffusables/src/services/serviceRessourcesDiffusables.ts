import oidc from '@uportal/open-id-connect';
import axios from 'axios';

const getToken = async (userInfoApiUrl: string): Promise<string> => {
  const { encoded } = await oidc({ userInfoApiUrl: userInfoApiUrl });

  return encoded;
};

const getUrlParams = (recherche: string): string =>
  recherche !== ''
    ? `&operator=OR&idRessource=${recherche}&nomRessource=${recherche}&idEditeur=${recherche}&nomEditeur=${recherche}&distributeurCom=${recherche}&nomDistributeurCom=${recherche}&distributeurTech=${recherche}&nomDistributeurTech=${recherche}`
    : '';

const getRessourcesDiffusables = async (url: string, userInfoApiUrl: string, page: number, recherche: string) =>
  await axios.get(`${url}?ressourcesPerPage=20&page=${page}${getUrlParams(recherche)}`, {
    headers: {
      Authorization: `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  });

const getSize = async (url: string, userInfoApiUrl: string, recherche: string) =>
  await axios.get(`${url}?${getUrlParams(recherche)}`, {
    headers: {
      Authorization: `Bearer ${await getToken(userInfoApiUrl)}`,
      'content-type': 'application/jwt',
    },
  });

export { getRessourcesDiffusables, getSize };
