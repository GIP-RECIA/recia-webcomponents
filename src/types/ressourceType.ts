import type { DomaineEnseignement } from './DomaineEnseignementType.ts';
import type { NiveauEducatif } from './NiveauEducatifType.ts';
import type { TypePedagogique } from './TypePedagogiqueType.ts';
import type { TypePresentation } from '@/types/TypePresentationType.ts';
import type { TypologieDocument } from '@/types/TypologieDocumentType.ts';

export type Ressource = {
  distributeurTech: string;

  domaineEnseignement: Array<DomaineEnseignement>;

  idEditeur: string;

  idEtablissement: {
    id: string;
    uai: string;
    nom: string | undefined;
  };

  idRessource: string;

  idType: string;

  niveauEducatif: Array<NiveauEducatif>;

  nomEditeur: string;

  nomRessource: string;

  sourceEtiquette: string;

  typePedagogique: Array<TypePedagogique>;

  typePresentation: Array<TypePresentation>;

  typologieDocument: Array<TypologieDocument>;

  urlAccesRessource: string;

  urlSourceEtquette: string;

  validateurTech: string;
};
