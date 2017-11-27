interface RequestText {
  type: 'REQUEST_TEXT'
}

export function RequestText(): RequestText {
  return { type: 'REQUEST_TEXT' }
}

interface ReceiveText {
  type: 'RECEIVE_TEXT'
  text: string
}

export function ReceiveText(text: string): ReceiveText {
  return { type: 'RECEIVE_TEXT', text }
}

export default { ReceiveText, RequestText }

export type TestAction = RequestText | ReceiveText
