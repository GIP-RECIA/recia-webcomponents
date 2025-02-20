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

import type { PersonneFonction } from './fonctionType'

export interface General {
  listFonctions: Array<PersonneFonction>
  sectionClassesGroupes: ClasseGroupe
}

export interface ClasseGroupe {
  sectionEleve: SectionEleve
  sectionProf: SectionProf
}

export interface SectionProf {
  etabs: Record<string, EnseignementProf[]>
}

export interface SectionEleve {
  etabs: Array<Etabs>
  enseignementSuivis: Array<string>
}

export interface Etabs {
  nameEtab: string
  classes: Array<string>
  groupes: Array<string>
}

export interface EnseignementProf {
  matiere: string
  cg: Etabs
}
