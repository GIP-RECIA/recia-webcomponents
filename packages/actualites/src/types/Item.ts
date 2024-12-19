import type { Organization } from '@/types/Organization.ts'
import type { Redactor } from '@/types/Redactor.ts'
import type { User } from '@/types/User.ts'

export interface Item {

  type: string
  id: number
  createdBy: User
  createdDate: Date
  lastModifiedBy: User
  lastModifiedDate: Date
  title: string
  enclosure: string
  endDate: Date
  startDate: Date
  validatedBy: User
  validatedDate: Date
  status: string
  summary: string
  rssAllowed: boolean
  organization: Organization
  redactor: Redactor
  body: string
  displayName: string
  contextKey: Set<object>
}
