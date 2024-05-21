import './assets/scss/app.scss';
import WisemappingEditor from './components/WisemappingEditor.tsx';
import { EditorRenderMode } from '@gip-recia/wisemapping-mindplot';
import { useState } from 'react';

function App() {
  const { VITE_PERSISTANCE_API_URL, VITE_FILE_ID, VITE_USER_INFO_API_URI } = import.meta.env;

  const ermValues: Array<EditorRenderMode> = [
    'edition-owner',
    'edition-editor',
    'edition-viewer',
    'viewonly-public',
    'viewonly-private',
    'showcase',
    'edition-locked',
  ];
  const [mode, setMode] = useState<EditorRenderMode>('edition-owner');

  const [leave, setLeave] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);

  const toggleRender = () => {
    if (render) {
      setLeave(true);
      setTimeout(() => setLeave(false), 200);
    }
    setTimeout(() => setRender(!render), 150);
  };

  return (
    <>
      <div className="settings">
        <div>
          <div>
            <b>Common settings</b>
          </div>
          <div>
            <input type="checkbox" checked disabled />
            persistanceApiUrl : {VITE_PERSISTANCE_API_URL}
          </div>
          <div>
            <input type="checkbox" checked disabled />
            fileId : {VITE_FILE_ID}
          </div>
          <div>
            <input type="checkbox" checked disabled />
            userInfoApiUrl : {VITE_USER_INFO_API_URI}
          </div>
          <div>
            <input type="checkbox" checked disabled />
            mode :
            {ermValues.map((erm, index) => {
              return (
                <label key={index}>
                  <input type="radio" checked={mode === erm} onChange={() => setMode(erm)} />
                  {erm}
                </label>
              );
            })}
          </div>
        </div>
        <div>
          <div>
            <b>Actions</b>
          </div>
          <button type="button" onClick={toggleRender}>
            {render ? 'Unmount' : 'Mount'}
          </button>
        </div>
      </div>
      <main>
        <div className="app-container">
          <div className="wisemapping__editor">
            {render && (
              <WisemappingEditor
                persistanceApiUrl={VITE_PERSISTANCE_API_URL}
                fileId={VITE_FILE_ID}
                userInfoApiUrl={VITE_USER_INFO_API_URI}
                mode={mode}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
