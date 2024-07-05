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
