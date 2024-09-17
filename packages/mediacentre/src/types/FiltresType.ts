import type { Filtre } from './FiltreType';

export type Filtres = {
  name: string;
  filterEnum: string;
  filters: Array<Filtre>;
};
