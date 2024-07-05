import { EditorRenderMode } from '@gip-recia/wisemapping-mindplot';

export type WisemappingEditorProps = {
  persistanceApiUrl: string;
  fileId: string;
  token?: string;
  userInfoApiUrl?: string;
  mode: EditorRenderMode;
};
