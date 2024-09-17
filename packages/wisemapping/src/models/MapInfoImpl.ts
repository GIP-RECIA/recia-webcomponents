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

import { MapInfo } from '@gip-recia/wisemapping-editor/dist/editor.js';

class MapInfoImpl implements MapInfo {
  private id: string;
  private title: string;
  private creatorFullName: string;
  private locked: boolean;
  private lockedMsg: string | undefined;
  private starred: boolean;

  constructor(id: string, title: string, creatorFullName: string, locked: boolean, lockedMsg?: string) {
    this.id = id;
    this.title = title;
    this.creatorFullName = creatorFullName;
    this.locked = locked;
    this.lockedMsg = lockedMsg;
    this.starred = true;
  }

  getId(): string {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(value: string): void {
    throw (this.title = value);
  }

  getCreatorFullName(): string {
    return this.creatorFullName;
  }

  isLocked(): boolean {
    return this.locked;
  }

  getLockedMessage(): string {
    return this.lockedMsg ? this.lockedMsg : '';
  }

  isStarred(): Promise<boolean> {
    return Promise.resolve(this.starred);
  }

  updateStarred(value: boolean): Promise<void> {
    this.starred = value;
    return Promise.resolve();
  }

  getZoom(): number {
    return 0.8;
  }
}

export default MapInfoImpl;
