import { keyframes } from 'react-emotion'
export const colors = {
  theme: '#3f51b5',
  grey: '#828282',
  greyLight: '#eee',
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
  s1: '10px',
  s2: '20px',
}

export const shadow = '0 1px 2px rgba(0,0,0,.1)'

export const animation = {
  spin: keyframes`
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  `,
}

export const transitionTime = 400
