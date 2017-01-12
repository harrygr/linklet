import html from 'choo/html'
import link from '../../components/link'
import * as map from 'lodash/fp/map'

const links = map(link)

export default (state, prev, send) => {
  const onload = () => send('links:fetchAll')
  const onunload = () => send('links:set', [])

  return html`
    <section id="links-index-page" onload=${onload} onunload=${onunload}>
    <a class="button is-primary is-outlined is-pulled-right" href="/links/new">New Link</a>
    <h1 class="title">Links</h1>

    ${links(state.links.links)}
    </section>
  `
}
