export const required = (val: string) => (val ? undefined : 'Required')

const emailPattern = /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i
export function emailAddress(value: string | undefined): undefined | string {
  if (!value) {
    return undefined
  }

  return emailPattern.exec(value) ? undefined : 'Must be a valid email address'
}

export function minLength(min: number) {
  return (value: string | undefined) =>
    value && value.length < min
      ? `Must be ${min} characters or more`
      : undefined
}

export function maxLength(max: number) {
  return (value: string | undefined) =>
    value && value.length > max
      ? `Must be ${max} characters or fewer`
      : undefined
}
