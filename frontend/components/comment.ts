import html from 'choo/html'
import * as moment from 'moment'

export default comment => {
  return html`
    <li>
      <strong>${comment.user.username}</strong> ${moment(comment.inserted_at).fromNow()}
      <div>${comment.body}</div>
      <br>
    </li>
  `
}
