import type { Filtrage } from '@/types/FiltrageType';
import type { Filtre } from '@/types/FiltreType';
import type { Filtres } from '@/types/FiltresType';
import type { Ressource } from '@/types/RessourceType';

const getFilters = (resources: Array<Ressource>, filterCategories: Array<string>): Array<Filtres> => {
  const filters: Array<Filtres> = [];
  for (const filtre of filterCategories) {
    const values: Filtres | undefined = getFilterCategories(filtre, resources);
    if (values != undefined) {
      filters.push(values);
    }
  }
  return filters;
};

const getFilterCategories = (filter: string, resources: Array<Ressource>): Filtres | undefined => {
  let values;

  switch (filter) {
    case 'NIVEAU_EDUCATIF_FILTER':
      values = new Set(resources.map((resource) => resource.niveauEducatif).flat());
      values = Array.from(values);
      break;
    case 'TYPE_PRESENTATION_FILTER':
      values = new Set(resources.map((resource) => resource.typePresentation).flat());
      values = Array.from(values);
      break;
    case 'DOMAINE_ENSEIGNEMENT_FILTER':
      values = new Set(resources.map((resource) => resource.domaineEnseignement).flat());
      values = Array.from(values);
      break;
    case 'UAI_FILTER':
      values = resources.map((resource) => resource.idEtablissement).flat();
      values = [...new Set(values)];
      break;
    default:
  }

  return convertToFiltres(values, filter);
};

const convertToFiltres = (values: Array<any>, filter: string): Filtres | undefined => {
  const filters: Array<Filtre> = [];
  let filtres;
  if (values.length == 0) {
    return;
  }
  switch (filter) {
    case 'NIVEAU_EDUCATIF_FILTER':
      values.forEach((item) => {
        filters.push({
          id: item.nom,
          nom: item.nom,
        });
      });
      filtres = {
        name: 'Par niveau éducatif',
        filterEnum: filter,
        filters: supprimerDoublons(filters),
      };
      break;
    case 'TYPE_PRESENTATION_FILTER':
      values.forEach((item) => {
        filters.push({
          id: item.code,
          nom: item.nom,
        });
      });
      filtres = {
        name: 'Par type de ressource',
        filterEnum: filter,
        filters: supprimerDoublons(filters),
      };
      break;
    case 'DOMAINE_ENSEIGNEMENT_FILTER':
      values.forEach((item) => {
        filters.push({
          id: item.nom,
          nom: item.nom,
        });
      });
      filtres = {
        name: 'Par matière',
        filterEnum: filter,
        filters: supprimerDoublons(filters),
      };
      break;
    case 'UAI_FILTER':
      values.forEach((item) => {
        filters.push({
          id: item.UAI,
          nom: item.nom.toLowerCase(),
        });
      });
      filtres = {
        name: 'Par établissement',
        filterEnum: filter,
        filters: supprimerDoublons(filters),
      };
      break;
    default:
  }
  return filtres;
};

function supprimerDoublons(filtres: Filtre[]): Filtre[] {
  const unique = new Set<string>();
  return filtres.filter((filtre) => {
    const isPresentInSet = unique.has(filtre.id);
    unique.add(filtre.id);
    return !isPresentInSet;
  });
}

export { getFilters };
