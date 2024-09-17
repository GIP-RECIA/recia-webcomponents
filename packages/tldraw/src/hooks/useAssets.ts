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

import { deleteAsset, saveAsset } from '../services/assetService.ts';
import { TldrawApp } from '@gip-recia/tldraw-v1';
import { useCallback } from 'react';

export function useAssets(assetApiUrl: string | undefined) {
  const onAssetCreate = useCallback(
    async (app: TldrawApp, file: File, id: string): Promise<string | false> => {
      try {
        const body = new FormData();
        body.append('name', id);
        body.append('file', file);
        const response = await saveAsset(assetApiUrl!, body);

        return `${assetApiUrl}/${response.data.uri}`;
      } catch (e) {
        return false;
      }
    },
    [assetApiUrl],
  );

  const onAssetDelete = useCallback(
    async (app: TldrawApp, id: string): Promise<boolean> => {
      try {
        await deleteAsset(assetApiUrl!, id);

        return true;
      } catch (e) {
        return false;
      }
    },
    [assetApiUrl],
  );

  return {
    onAssetCreate: assetApiUrl ? onAssetCreate : undefined,
    onAssetDelete: assetApiUrl ? onAssetDelete : undefined,
  };
}
