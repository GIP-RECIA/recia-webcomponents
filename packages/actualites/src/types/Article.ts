import type { LinkedFile } from '@/types/LinkedFile.ts'

export interface Article {
  title: string
  link: string
  enclosure: string
  description: string
  pubDate: Date
  guid: number
  categories: string[]
  creator: string
  date: Date
  files: LinkedFile[]
}
