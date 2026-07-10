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

import { faUserClock, faUserLock, faUserSecret } from '@fortawesome/free-solid-svg-icons'

export enum Etat {
  Inconnu = 'Inconnu',
  Invalide = 'Invalide',
  Valide = 'Valide',
  Unpublished = 'Unpublished',
  Bloque = 'Bloque',
  Delete = 'Delete',
  Deleting = 'Deleting',
  Incertain = 'Incertain',
  Incertain_Export_Add = 'Incertain_Export_Add',
  Incertain_Export_Delete = 'Incertain_Export_Delete',
  Incertain_Export_Modify = 'Incertain_Export_Modify',
}

interface EnumValues {
  i18n: string
  color: string
  icon?: any
}

export const etatFilters: Etat[] = [
  Etat.Invalide,
  Etat.Valide,
  Etat.Bloque,
  Etat.Delete,
  Etat.Deleting,
  Etat.Incertain,
]

export const etatMap: Record<Etat, EnumValues> = {
  [Etat.Inconnu]: {
    i18n: 'user.status.inconnu',
    color: '#9E9E9E',
    icon: faUserSecret,
  },
  [Etat.Invalide]: {
    i18n: 'user.status.invalid',
    color: '#A5D6A7',
  },
  [Etat.Valide]: {
    i18n: 'user.status.valid',
    color: '#4CAF50',
  },
  [Etat.Unpublished]: {
    i18n: 'user.status.unpublished',
    color: '#607D8B',
  },
  [Etat.Bloque]: {
    i18n: 'user.status.locked',
    color: '#795548',
    icon: faUserLock,
  },
  [Etat.Delete]: {
    i18n: 'user.status.deleted',
    color: '#EF9A9A',
  },
  [Etat.Deleting]: {
    i18n: 'user.status.deleting',
    color: '#FF5722',
    icon: faUserClock,
  },
  [Etat.Incertain]: {
    i18n: 'user.status.uncertain',
    color: '#FFEB3B',
  },
  [Etat.Incertain_Export_Add]: {
    i18n: 'user.status.uncertainExportAdd',
    color: '#FFEB3B',
  },
  [Etat.Incertain_Export_Delete]: {
    i18n: 'user.status.uncertainExportDelete',
    color: '#FFEB3B',
  },
  [Etat.Incertain_Export_Modify]: {
    i18n: 'user.status.uncertainExportModify',
    color: '#FFEB3B',
  },
}
