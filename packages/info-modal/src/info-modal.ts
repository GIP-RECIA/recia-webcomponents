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

import styles from './info-modal.scss?inline';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { CSSResult, LitElement, TemplateResult, css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('info-modal')
export class InfoModal extends LitElement {
  static styles: CSSResult = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: Boolean, reflect: true })
  isOpen = false;

  @property({ type: String })
  titleModal = '';

  @property({ type: Boolean })
  debug = false;

  @property({ type: Object })
  mainElement!: HTMLElement | undefined;

  @state()
  modalElement: HTMLElement | undefined;

  @state()
  closeButtonElement: HTMLElement | undefined;

  public constructor() {
    super();
    library.add(faXmark);
  }

  firstUpdated() {
    this.modalElement = this.renderRoot.querySelector('#modal') as HTMLElement;
    this.closeButtonElement = this.renderRoot.querySelector('.close-button') as HTMLElement;

    this.log(
      'modal ' + this.modalElement !== null || this.modalElement !== undefined
        ? 'retrieved successfully'
        : 'not retrieved',
    );

    this.log(
      'close button ' + this.closeButtonElement !== null || this.closeButtonElement !== undefined
        ? 'retrieved successfully'
        : 'not retrieved',
    );

    this.mainElement = document.querySelector('main') as HTMLElement;
    this.log(
      'main ' + this.mainElement !== null || this.mainElement !== undefined
        ? 'retrieved successfully'
        : 'not retrieved',
    );

    if (this.modalElement) {
      this.modalElement.addEventListener('click', this.closeModalWithoutButton.bind(this));
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    if (this.closeButtonElement) {
      this.closeButtonElement.addEventListener('click', () => this.closeModal());
      window.setTimeout(() => {
        this.closeButtonElement!.focus();
      }, 100);
    }

    this.log('component first updated');
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown);
    this.modalElement?.removeEventListener('click', this.closeModalWithoutButton);
    this.closeButtonElement?.removeEventListener('click', this.closeModal);
    super.disconnectedCallback();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(message: any) {
    if (this.debug === true) console.log(message);
  }

  openModal() {
    if (this.mainElement) {
      this.modalElement!.removeAttribute('aria-hidden');
      this.modalElement!.setAttribute('aria-hidden', 'false');
      this.mainElement!.inert = true;
      this.mainElement!.setAttribute('aria-hidden', 'true');
      this.log(
        'element actif : { type : ' +
          document.activeElement?.tagName +
          ', \n classe : ' +
          document.activeElement?.classList,
      );
      this.setFocus();
    }
  }

  setFocus() {
    const test = this.shadowRoot?.querySelector('.close-button') as HTMLElement;
    window.setTimeout(() => {
      test.focus();
    }, 100);
  }

  closeModal() {
    this.log('main ' + this.mainElement);
    this.log('modal ' + this.modalElement);
    this.modalElement!.removeAttribute('aria-hidden');
    this.modalElement!.setAttribute('aria-hidden', 'true');
    if (this.mainElement) {
      this.mainElement!.removeAttribute('aria-hidden');

      this.mainElement!.setAttribute('aria-hidden', 'false');
      this.mainElement!.inert = false;
    }

    this.isOpen = false;

    const slots = this.renderRoot.querySelectorAll('slot') as NodeListOf<HTMLElement>;
    window.setTimeout(() => {
      slots?.forEach((slot) => slot.scrollTo(0, 0));
    }, 200);

    window.setTimeout(() => {
      const myEvent = new CustomEvent('closeModale', {
        bubbles: true,
        composed: true,
      });
      document.dispatchEvent(myEvent);
    }, 210);
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (this.isOpen) {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    }
  };

  closeModalWithoutButton(event: Event) {
    if ((event.target as Element) === this.modalElement) {
      this.closeModal();
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('isOpen')) {
      this.log('isOpen updated');
      if (this.isOpen) {
        this.log('isOpen updated : true');
        this.openModal();
        const test = this.shadowRoot?.querySelector('.close-button') as HTMLElement;
        test.focus();
      } else {
        this.log('isOpen updated : false');
        this.closeModal();
      }
    }
  }

  render() {
    const faXmarkIcon = `${icon(faXmark).html}`;

    const manualModal: TemplateResult = html` <div
      id="modal"
      class="modal-overlay"
      aria-modal="true"
      role="dialog"
      aria-labelledby="${this.titleModal}"
      aria-live="assertive"
      aria-hidden="true"
    >
      <div class="modal-container" id="modal-container" role="document">
        <div class="modal-header">
          <h2 class="modal-title" title="${this.titleModal}">${this.titleModal}</h2>

          <button
            id="close-button"
            type="button"
            aria-label="close"
            class="close-button"
            title="Fermer la modale"
            tabindex="0"
          >
            ${unsafeHTML(faXmarkIcon)}
          </button>
        </div>

        <slot name="modal-body" class="modal-body"> </slot>

        <slot name="modal-footer" class="modal-footer"> </slot>
      </div>
    </div>`;

    return manualModal;
  }
}
