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
import { getFile, saveFile } from '../services/fileService.ts';
import { TDDocument, TldrawApp } from '@gip-recia/tldraw-v1';
import { useCallback } from 'react';

const toBlob = (app: TldrawApp): string => {
  return JSON.stringify({
    name: app.state.document.name,
    fileHandle: null,
    document: app.state.document,
    assets: app.state.document.assets,
  });
};

export function usePersistance(persistanceApiUrl: string | undefined) {
  const onSaveProject = useCallback(
    async (app: TldrawApp) => {
      if (!persistanceApiUrl) return;

      return await saveFile(persistanceApiUrl, toBlob(app));
    },
    [persistanceApiUrl],
  );

  const loadDocument = useCallback(
    async (app: TldrawApp): Promise<void> => {
      if (!persistanceApiUrl) return;

      const response = await getFile(persistanceApiUrl);
      if (response.data.data != '') {
        app.loadDocument(JSON.parse(response.data.data).document as TDDocument);
        app.document.name = response.data.title;
      }
    },
    [persistanceApiUrl],
  );

  return {
    onSaveProject,
    loadDocument,
  };
}

export { toBlob };
