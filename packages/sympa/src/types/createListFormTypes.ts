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

export interface EditorAlias {
  name: string
  checked: boolean
  editable: boolean
  idRequest: string
}

export interface CreateOrUpdateListFormDataResponsePayload {
  editorsAliases: EditorAlias[]
  type: string
  typeParam: string
  typeParamName: string
  subscribersGroup: string
}

export interface GroupTreeNode {
  text: string
  getChildren: GroupTreeNode[]
  id: string
  children: boolean
  iconIndex: number
  parent?: GroupTreeNode
}
