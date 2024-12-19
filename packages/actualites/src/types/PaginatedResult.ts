import type { Actualite } from '@/types/Actualite.ts'

export interface PaginatedResult {

  actualite: Actualite
  pageIndex: number
  pageSize: number
  totalItems: number
  totalPages: number

}
