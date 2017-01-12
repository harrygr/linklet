import html from 'choo/html'

type NotificationType = 'primary' | 'success' | 'danger'

interface Props {
  message: string
  type?: NotificationType
  visible?: boolean
}

 const notification = ({
  message,
  type = 'primary',
  visible = false
}: Props) => {
  return html`
    <div class="notification is-${type} snackbar ${visible ? 'visible' : ''}">
      ${message}
    </div>
  `
}

export default notification