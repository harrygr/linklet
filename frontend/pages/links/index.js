const html = require('choo/html')
const link = require('../../components/link')
const map = require('lodash/fp/map')

const links = map(link)

module.exports = (state, prev, send) => {
  return html`
    <section onload=${() => send('links:fetchAll')}>
    <a class="button is-primary is-outlined is-pulled-right" href="/links/new">New Link</a>
    <h1 class="title">Links</h1>

    ${links(state.links.links)}
    </section>
  `
}
