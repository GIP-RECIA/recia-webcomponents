import type { Article } from '@/types/Article.ts'
import type { Visibility } from '@/types/Visibility.ts'

export interface ItemVO {
  article: Article
  type: string
  creator: string
  pubDate: string
  createdDate: string
  modifiedDate: string
  uuid: string
  rubriques: Array<string>
  visibility: Visibility
  source: string
}
