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
import { useAssets } from '../hooks/useAssets.ts';
import { findLanguage } from '../utils/i18nUtils.ts';
import { donwloadImageFile } from '../utils/tldrawUtils.ts';
import { toBlob, usePersistance } from './usePersistance.ts';
import { TDExport, TldrawApp, useFileSystem } from '@gip-recia/tldraw-v1';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { useCallback, useRef } from 'react';

export function useSingleplayer(
  persistanceApiUrl: string | undefined,
  assetsApiUrl: string | undefined,
  autoSave: boolean,
  autoSaveDelay: number,
  open: boolean,
  isReady: boolean,
  setIsSaving: (isSaving: boolean) => void,
  setIsLoading: (value: boolean) => void,
  setIsError: (value: boolean) => void,
  setIsReady: (value: boolean) => void,
) {
  const { onSaveProject, onOpenProject } = useFileSystem();
  const { onSaveProject: onPSaveProject, loadDocument } = usePersistance(persistanceApiUrl);

  const onMount = useCallback(
    debounce(async (app: TldrawApp): Promise<void> => {
      app.setSetting('language', findLanguage('en'));
      if (persistanceApiUrl) {
        setIsLoading(true);
        try {
          await loadDocument(app);
          setIsLoading(false);
          setIsReady(true);
        } catch (e) {
          setIsLoading(false);
          setIsError(true);
          console.error(e);
        }
      }
    }, 10),
    [persistanceApiUrl],
  );

  const onSave = useCallback(
    async (app: TldrawApp): Promise<void> => {
      setIsSaving(true);
      try {
        const response = await onPSaveProject(app);
        if (response?.status === 200) {
          setTimeout(() => {
            setIsSaving(false);
          }, 1000);
        }
      } catch (e) {
        setIsSaving(false);
        onSaveProject(app);
      }
    },
    [persistanceApiUrl],
  );

  const blob = useRef<string>('');

  const onPersist = useCallback(
    throttle(async (app: TldrawApp): Promise<void> => {
      if (!isReady || !autoSave) return;
      const newBlob = toBlob(app);
      if (blob.current == newBlob) return;
      blob.current = newBlob;
      await onSave(app);
    }, autoSaveDelay),
    [isReady, autoSave, autoSaveDelay],
  );

  const onExport = useCallback(async (app: TldrawApp, info: TDExport): Promise<void> => {
    donwloadImageFile(app, info);
  }, []);

  return {
    onMount,
    onOpenProject: open ? onOpenProject : undefined,
    onSaveProject: persistanceApiUrl ? onSave : onSaveProject,
    onPersist,
    onExport,
    ...useAssets(assetsApiUrl),
  };
}
