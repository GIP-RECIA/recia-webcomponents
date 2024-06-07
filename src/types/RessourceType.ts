import type { DomaineEnseignement } from './DomaineEnseignementType.ts';
import type { IdEtablissement } from './IdEtablissementType.ts';
import type { NiveauEducatif } from './NiveauEducatifType.ts';
import type { TypePedagogique } from './TypePedagogiqueType.ts';
import type { TypePresentation } from '@/types/TypePresentationType.ts';
import type { TypologieDocument } from '@/types/TypologieDocumentType.ts';

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

export function createRessourceFromJson(jsonData: any): Ressource {
  return {
    ...jsonData,
    isFavorite: jsonData.isFavorite ?? false,
  };
}
