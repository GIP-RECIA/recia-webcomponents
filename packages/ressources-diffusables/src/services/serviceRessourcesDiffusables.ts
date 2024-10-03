/**
 * Copyright (C) 2023 GIP-RECIA, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// import axios from 'axios';
import { instance } from '@/utils/axiosUtils';
import oidc from '@uportal/open-id-connect';

function getUrlParams(recherche: string): string {
  return recherche !== ''
    ? `&operator=OR&idRessource=${recherche}&nomRessource=${recherche}&idEditeur=${recherche}&nomEditeur=${recherche}&distributeurCom=${recherche}&nomDistributeurCom=${recherche}&distributeurTech=${recherche}&nomDistributeurTech=${recherche}`
    : ''
}

const getRessourcesDiffusables = async (url: string, userInfoApiUrl: string, page: number, recherche: string) =>
  await instance.get(`${url}?ressourcesPerPage=20&page=${page}${getUrlParams(recherche)}`, {});

const getSize = async (url: string, userInfoApiUrl: string, recherche: string) =>
  await instance.get(`${url}?${getUrlParams(recherche)}`, {});

export { getRessourcesDiffusables, getSize }
