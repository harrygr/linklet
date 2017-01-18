import html from 'choo/html'
import link from '../../components/link'
import * as map from 'lodash/fp/map'

const links = map(link)

export default (state, prev, send) => {
  const onload = () => send('link:fetchAll')
  const onunload = () => send('link:setLinks', [])

  return html`
    <section id="links-index-page" onload=${onload} onunload=${onunload}>
    <a class="button is-primary is-outlined is-pulled-right" href="/links/new">New Link</a>
    <h1 class="title">Links</h1>
    <p class="loading-indicator ${state.transition.link}">Loading...</p>

    ${state.transition.link == '' ? html`
    <div class="box-list">
      ${links(state.link.links)}
    </div>
    ` : ''}
    </section>
  `
}
