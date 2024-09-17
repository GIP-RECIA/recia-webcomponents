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

import type { DomaineEnseignement } from './DomaineEnseignementType';
import type { IdEtablissement } from './IdEtablissementType';
import type { NiveauEducatif } from './NiveauEducatifType';
import type { TypePedagogique } from './TypePedagogiqueType';
import type { TypePresentation } from '@/types/TypePresentationType';
import type { TypologieDocument } from '@/types/TypologieDocumentType';

export type Ressource = {
  distributeurTech: string;

  domaineEnseignement: Array<DomaineEnseignement>;

  idEditeur: string;

  idEtablissement: Array<IdEtablissement>;

  idRessource: string;

  idType: string;

  niveauEducatif: Array<NiveauEducatif>;

  nomEditeur: string;

  nomRessource: string;

  sourceEtiquette: string;

  typePedagogique: Array<TypePedagogique>;

  typePresentation: TypePresentation;

  typologieDocument: Array<TypologieDocument>;

  urlAccesRessource: string;

  urlSourceEtiquette: string;

  urlVignette: string | undefined;

  validateurTech: string;

  description?: string;

  isFavorite: boolean;
};

export function createResourceFromJson(jsonData: any): Ressource {
  return {
    ...jsonData,
    isFavorite: jsonData.isFavorite ?? false,
  };
}
