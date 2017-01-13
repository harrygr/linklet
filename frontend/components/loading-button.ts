import html from 'choo/html'

export default function (buttonContent: string, transitionClass: string) {
  const loading = transitionClass !== ''
  return html`
    <button class="button is-primary is-fullwidth ${loading ? 'is-disabled' : ''}" type="submit">
    <span class="loading-indicator ${transitionClass}">Loading...</span>
    ${!loading ? buttonContent : ''}
    </button>
  `
}
