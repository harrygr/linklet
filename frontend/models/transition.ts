export default () => {
  return {
    namespace: 'transition',
    state: {
      button: '',
      link: '',
      comment: ''
    },
    reducers: {
      fadeIn (state, domain) {
        return {[domain]: 'fadeIn'}
      },
      fadeOut (state, domain) {
        return {[domain]: 'fadeOut'}
      },
      complete (state, domain) {
        return {[domain]: ''}
      }
    }
  }
}
