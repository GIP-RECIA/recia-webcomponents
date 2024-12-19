import type { ItemVO } from '@/types/ItemVO.ts'
import type { Rubrique } from '@/types/Rubrique.ts'

export interface Actualite {
  rubriques: Array<Rubrique>
  items: Array<ItemVO>
  sources: Array<string>
}
