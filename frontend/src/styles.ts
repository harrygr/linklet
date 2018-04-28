import { keyframes } from 'react-emotion'
export const colors = {
  themeDarker: '#689064',
  themeDark: '#79a075',
  theme: '#89B584',
  themeLight: '#94c48f',

  // Greys
  grey3: '#828282',
  grey5: '#d4d4d4',
  grey7: '#eee',

  // Validation
  red: '#F44336',
  blue: '#2196F3',
  green: '#4CAF50',
  orange: '#FF9800',
  amber: '#FFC107',
}

export const fontSizes = {
  small: '12px',
  medium: '15px',
  largish: '16px',
  large: '18px',
}

export const spacing = {
  flea: '5px',
  mouse: '10px',
  cat: '20px',
  sheep: '32px',
  cow: '50px',
}

export const shadow = '0 1px 2px rgba(0,0,0,.1)'

export const animation = {
  spin: keyframes`
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  `,
}

export const transitionTime = 400
