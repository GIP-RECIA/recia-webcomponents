import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import styles from './info-modal.scss?inline';

@customElement("info-modal")
export class InfoModal extends LitElement {

  static styles = unsafeCSS(styles);

  render() {
    return html`
      <p>info-modal</p>
    `;
  }
}
