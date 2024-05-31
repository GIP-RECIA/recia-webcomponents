import type { Filtrage } from '@/types/FiltrageType';
import type { Filtre } from '@/types/FiltreType';
import type { Filtres } from '@/types/FiltresType';
import type { Ressource } from '@/types/RessourceType';

const getFilters = (resources: Array<Ressource>, filterCategories: Array<string>): Array<Filtres> => {
  const filters: Array<Filtres> = [];
  console.log(filterCategories);
  for (const filtre of filterCategories) {
    filters.push(getFilterCategories(filtre, resources));
  }
  console.log('avant de donner les filtres a pageMediacentre');
  return filters;
};

const getFilterCategories = (filter: string, resources: Array<Ressource>): Filtres => {
  let values;
  console.log('avant passage dans switch(filter)');

  switch (filter) {
    case 'NIVEAU_EDUCATIF_FILTER':
      console.log('dans case niv edu');
      console.log('etat avant set : ', resources.map((resource) => resource.niveauEducatif).flat());
      values = new Set(resources.map((resource) => resource.niveauEducatif).flat());
      values = Array.from(values);
      console.log(values);
      break;
    case 'TYPE_PRESENTATION_FILTER':
      console.log('dans case type pres');
      values = new Set(resources.map((resource) => resource.typePresentation).flat());
      values = Array.from(values);
      console.log(values);
      break;
    case 'DOMAINE_ENSEIGNEMENT_FILTER':
      console.log('dans case domaine');
      values = new Set(resources.map((resource) => resource.domaineEnseignement).flat());
      values = Array.from(values);
      console.log(values);
      break;
    case 'UAI_FILTER':
      console.log('dans case uai');
      values = resources.map((resource) => resource.idEtablissement).flat();
      values = [...new Set(values)];
      console.log(values);
      break;
    default:
  }

  return convertToFiltres(values, filter);
};

const convertToFiltres = (values: Array<any>, filter: string): Filtres => {
  const filters: Array<Filtre> = [];
  let filtres;
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
