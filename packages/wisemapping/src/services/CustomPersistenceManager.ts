import { instance as axios } from '../utils/axiosUtils.ts';
import { $assert } from '@gip-recia/wisemapping-core-js';
import { PersistenceError, PersistenceManager } from '@gip-recia/wisemapping-editor/dist/editor.js';

class CustomPersistenceManager extends PersistenceManager {
  private documentUrl: string;

  private onSave: boolean;

  private clearTimeout;

  constructor(options: { documentUrl: string }) {
    $assert(options.documentUrl, 'documentUrl can not be null');
    super();

    this.documentUrl = options.documentUrl;
    this.onSave = false;
  }

  discardChanges(mapId: string): void {}

  async loadMapDom(mapId: string): Promise<Document> {
    const response = await axios.get(this.documentUrl.replace('{id}', mapId));
    return new DOMParser().parseFromString(response.data.data, 'text/xml');
  }

  async saveMapXml(mapId: string, mapXml: Document, pref?: string, saveHistory?: boolean, events?): Promise<void> {
    const body = {
      data: new XMLSerializer().serializeToString(mapXml),
    };

    if (!this.onSave) {
      // Mark save in process and fire a event unlocking the save ...
      this.onSave = true;
      this.clearTimeout = setTimeout(() => {
        this.clearTimeout = null;
        this.onSave = false;
      }, 10000);

      const persistence = this;

      try {
        await axios.put(this.documentUrl.replace('{id}', mapId), body);
        events.onSuccess();
      } catch (e) {
        console.log(e);
        const userMsg: PersistenceError = {
          severity: 'SEVERE',
          message: 'SAVE_COULD_NOT_BE_COMPLETED',
          errorType: 'generic',
        };
        // @ts-ignore
        this.triggerError(userMsg);
        events.onError(userMsg);

        // Clear event timeout ...
        if (persistence.clearTimeout) {
          clearTimeout(persistence.clearTimeout);
        }
        persistence.onSave = false;
      }
    }
  }

  unlockMap(mapId: string): void {}
}

export default CustomPersistenceManager;
