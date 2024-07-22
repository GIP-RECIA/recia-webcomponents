import type { DistributeursCom } from '@/types/disctibuteurComType.ts';

export type Ressource = {
  ressource: {
    id: string;
    nom: string;
  };
  editeur: {
    id: string;
    nom: string;
  };
  distributeursCom: Array<DistributeursCom>;
  distributeurTech: {
    id: string;
    nom: string;
  };
  affichable: boolean;
  diffusable: boolean;
};
