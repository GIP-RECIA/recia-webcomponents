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
import oidc, { type JWT } from '@uportal/open-id-connect';
import { jwtDecode } from 'jwt-decode';

let userInfoApiUrl: string;

const setUserInfoApiUrl = (url: string): void => {
  userInfoApiUrl = url;
};

const getJwt = async (): Promise<{ encoded: string; decoded: JWT }> => {
  const { encoded, decoded } = await oidc({ userInfoApiUrl });

  return { encoded, decoded };
};

const parseJwt = (token: string): JWT => jwtDecode(token);

export { setUserInfoApiUrl, getJwt, parseJwt };
