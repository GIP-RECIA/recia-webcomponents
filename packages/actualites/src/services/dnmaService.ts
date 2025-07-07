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

import type { ItemVOForRead } from '@/types/ItemVOForRead'
import type { PageType } from '@/types/PageType'
import { itemvoFilter } from '@/utils/itemvoFilter'

export class dnmaService {
  static openAll(fname: PageType, source?: string) {
    let phrase: string = 'Inconnu'
    if (fname === 'News') {
      phrase = 'TOUTES_ACTU'
    }
    else if (fname === 'Documents') {
      phrase = 'TOUS_DOC'
    }
    const openEvent = source !== undefined ? new CustomEvent('DNMA-ACTUS-DOCS', { detail: { fname, NIVEAU2: phrase, NIVEAU3: source ?? 'Toutes sources confondues' } }) : new CustomEvent('DNMA-ACTUS-DOCS', { detail: { fname, NIVEAU2: phrase } })
    document.dispatchEvent(openEvent)
  }

  static readItemVO(itemVOForRead: ItemVOForRead) {
    let phrase: string = 'Inconnu'
    let fname: string = 'Inconnu'
    if (itemvoFilter.isNews(itemVOForRead)) {
      phrase = 'UNE_ACTU'
      fname = 'News'
    }
    else if (itemvoFilter.isDocument(itemVOForRead)) {
      phrase = 'UN_DOC'
      fname = 'Documents'
    }
    const readEvent = new CustomEvent('DNMA-ACTUS-DOCS', { detail: { fname, NIVEAU2: phrase, NIVEAU3: itemVOForRead.pubBy } })
    document.dispatchEvent(readEvent)
  }
}
