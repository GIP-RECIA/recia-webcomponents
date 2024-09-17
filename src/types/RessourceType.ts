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
