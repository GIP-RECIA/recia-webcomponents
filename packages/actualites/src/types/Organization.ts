import type {User} from "@/types/User.ts";

export interface Organization{
  id: number
  createdBy: User
  createdDate: Date
  lastModifiedBy: User
  lastModifiedDate: Date
  name: string
  displayname: string
  description: string
  displayOrder: number
  allowNotifications: boolean
  identifiers: Set<string>
  contextKey: Set<object>

}
