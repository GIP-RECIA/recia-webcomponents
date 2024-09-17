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

import WisemappingEditorSFC from './components/WisemappingEditor.tsx';
import r2wc from '@r2wc/react-to-web-component';

const WisemappingEditor = r2wc(WisemappingEditorSFC, {
  props: {
    persistanceApiUrl: 'string',
    fileId: 'string',
    token: 'string',
    userInfoApiUrl: 'string',
    mode: 'string',
  },
});

const register = (): void => {
  customElements.define('wisemapping-editor', WisemappingEditor);
};

export { WisemappingEditor, register };
