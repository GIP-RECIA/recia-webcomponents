import { LitElement, html, TemplateResult, css, unsafeCSS, CSSResult } from 'lit'
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import { customElement, property, state } from 'lit/decorators.js'
import styles from './info-modal.scss?inline'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark'

@customElement('info-modal')
export class InfoModal extends LitElement {
  static styles: CSSResult = css`
    ${unsafeCSS(styles)}
  `

  @property({ type: Boolean, reflect: true })
  isOpen = false

  @property({ type: String })
  titleModal = ''

  @property({ type: Boolean })
  debug = false

  @property()
  mainElement!: HTMLElement | undefined

  @state()
  modalElement: HTMLElement | undefined

  @state()
  closeButtonElement: HTMLElement | undefined

  public constructor() {
    super()
    library.add(faXmark)
  }

  firstUpdated() {
    this.modalElement = this.renderRoot.querySelector('#modal') as HTMLElement
    this.closeButtonElement = this.renderRoot.querySelector('.close-button') as HTMLElement

    this.modalElement !== null || this.modalElement !== undefined
      ? this.log('modal retrieved successfully')
      : this.log('modal not retrieved')

    this.closeButtonElement !== null || this.closeButtonElement !== undefined
      ? this.log('close button retrieved successfully')
      : this.log('close button not retrieved')

    this.mainElement = document.querySelector('main') as HTMLElement
    this.mainElement !== null || this.mainElement !== undefined
      ? this.log('main retrieved successfully')
      : this.log('main not retrieved')

    if (this.modalElement) {
      this.modalElement.addEventListener('click', this.closeModalWithoutButton.bind(this))
      document.addEventListener('keydown', this.handleKeyDown.bind(this))
    }

    if (this.closeButtonElement) {
      this.closeButtonElement.addEventListener('click', () => this.closeModal())
      window.setTimeout(() => {
        this.closeButtonElement!.focus()
      }, 100)
    }

    this.log('component first updated')
  }

  connectedCallback() {
    super.connectedCallback()
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeyDown)
    this.modalElement?.removeEventListener('click', this.closeModalWithoutButton)
    this.closeButtonElement?.removeEventListener('click', this.closeModal)
    super.disconnectedCallback()
  }

  log(message: any) {
    if (this.debug === true) console.log(message)
  }

  openModal() {
    if (this.mainElement) {
      this.modalElement!.removeAttribute('aria-hidden')
      this.modalElement!.setAttribute('aria-hidden', 'false')
      this.mainElement!.inert = true
      this.mainElement!.setAttribute('aria-hidden', 'true')
      this.log(
        'element actif : { type : ' +
          document.activeElement?.tagName +
          ', \n classe : ' +
          document.activeElement?.classList
      )
      this.setFocus()
    }
  }

  setFocus() {
    const test = this.shadowRoot?.querySelector('.close-button') as HTMLElement
    window.setTimeout(() => {
      test.focus()
    }, 100)
  }

  closeModal() {
    this.log('main ' + this.mainElement)
    this.log('modal ' + this.modalElement)
    this.modalElement!.removeAttribute('aria-hidden')
    this.modalElement!.setAttribute('aria-hidden', 'true')
    if (this.mainElement) {
      this.mainElement!.removeAttribute('aria-hidden')

      this.mainElement!.setAttribute('aria-hidden', 'false')
      this.mainElement!.inert = false
    }

    this.isOpen = false

    const slots = this.renderRoot.querySelectorAll('slot') as NodeListOf<HTMLElement>
    window.setTimeout(() => {
      slots?.forEach(slot => slot.scrollTo(0, 0))
    }, 200)

    window.setTimeout(() => {
      const myEvent = new CustomEvent('closeModale', {
        bubbles: true,
        composed: true
      })
      document.dispatchEvent(myEvent)
    }, 210)
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (this.isOpen) {
      if (event.key === 'Escape') {
        this.closeModal()
      }
    }
  }

  closeModalWithoutButton(event: Event) {
    if ((event.target as Element) === this.modalElement) {
      this.closeModal()
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('isOpen')) {
      this.log('isOpen updated')
      if (this.isOpen) {
        this.log('isOpen updated : true')
        this.openModal()
        const test = this.shadowRoot?.querySelector('.close-button') as HTMLElement
        test.focus()
      } else {
        this.log('isOpen updated : false')
        this.closeModal()
      }
    }
  }

  render() {
    const faXmarkIcon = `${icon(faXmark).html}`

    const manualModal: TemplateResult = html` <div
      id="modal"
      class="modal-overlay"
      aria-modal="true"
      role="dialog"
      aria-labelledby="${this.titleModal}"
      aria-live="assertive"
      aria-hidden="true">
      <div class="modal-container" id="modal-container" role="document">
        <div class="modal-header">
          <h2 class="modal-title" title="${this.titleModal}">${this.titleModal}</h2>

          <button
            id="close-button"
            type="button"
            aria-label="close"
            class="close-button"
            title="Fermer la modale"
            tabindex="0">
            ${unsafeHTML(faXmarkIcon)}
          </button>
        </div>

        <slot name="modal-body" class="modal-body"> </slot>

        <slot name="modal-footer" class="modal-footer"> </slot>
      </div>
    </div>`

    return manualModal
  }
}
