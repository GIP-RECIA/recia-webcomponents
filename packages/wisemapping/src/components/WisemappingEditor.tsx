import MapInfoImpl from '../models/MapInfoImpl';
import CustomPersistenceManager from '../services/CustomPersistenceManager';
import { WisemappingEditorProps } from '../types/WisemappingEditorProps';
import { setToken } from '../utils/axiosUtils';
import { findLanguage } from '../utils/i18nUtils';
import { setUserInfoApiUrl } from '../utils/soffitUtils';
import Editor, {
  Designer,
  EditorOptions,
  MapInfo,
  PersistenceManager,
  useEditor,
} from '@gip-recia/wisemapping-editor/dist/editor.js';

export default function WisemappingEditor({
  persistanceApiUrl,
  fileId,
  token,
  userInfoApiUrl,
  mode,
}: Readonly<WisemappingEditorProps>) {
  if (!token && !userInfoApiUrl) throw new Error('Token or userInfoApiUrl is required');

  if (token?.startsWith('Bearer ')) setToken(token);
  else if (token) throw new Error('Invalid token');
  if (userInfoApiUrl) setUserInfoApiUrl(userInfoApiUrl);

  const mapInfo: MapInfo = new MapInfoImpl(fileId, '', '', false);
  const options: EditorOptions = {
    mode,
    locale: findLanguage('fr'),
    enableKeyboardEvents: true,
    enableAppBar: false,
  };
  const persistenceManager: PersistenceManager = new CustomPersistenceManager({
    documentUrl: `${persistanceApiUrl}/{id}`,
  });

  const initialization = (designer: Designer) => {
    designer.addEvent('loadSuccess', () => {
      document.getElementById('mindmap-comp')?.classList.add('ready');
    });
  };

  const editor = useEditor({
    mapInfo,
    options,
    persistenceManager,
  });

  return <Editor config={editor} onLoad={initialization} onAction={() => {}} />;
}
