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

import { downloadBlob } from './fileUtils.ts';
import { TDExport, TldrawApp } from '@gip-recia/tldraw-v1';

const getName = (app: TldrawApp, info?: TDExport): string => {
  return `${app.document.name}${info ? ' - ' + info.name : ''}`;
};

const toTLDRFile = (app: TldrawApp): File => {
  return new File([JSON.stringify({ document: app.state.document })], getName(app), {
    type: 'application/tldr;charset=utf-8',
  });
};

const toImageFile = (app: TldrawApp, info: TDExport): File => {
  return new File([info.blob], getName(app, info), { type: info.blob.type });
};

const donwloadImageFile = (app: TldrawApp, info: TDExport): void => {
  downloadBlob(info.blob, getName(app, info));
};

export { toTLDRFile, toImageFile, donwloadImageFile };
