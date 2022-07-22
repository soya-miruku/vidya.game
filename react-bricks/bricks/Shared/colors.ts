export type TextColorName =
  | 'gray900'
  | 'gray800'
  | 'gray700'
  | 'gray600'
  | 'gray500'
  | 'purple500'
  
export type BgColorName =
  | 'white'
  | 'black'
  | 'light'
  | 'gray'
  | 'lightBlue'
  | 'orange'
  | 'green'
  | 'darkBlue'
  | 'darkBlue200'
  | 'dark'
  | 'purple'
  | 'purple200'
  | 'accent'
  | 'red'
  | 'cyan'
  | 'none'

export type GradientName = 'none' | 'ocean' | 'violet' | 'sun'
export type BadgeColorName = 'gray' | 'pink' | 'green' | 'blue'

export type BulletColorName =
  | 'pink'
  | 'pinkLight'
  | 'azure'
  | 'azureLight'
  | 'green'
  | 'greenLight'

type Color = {
  label: string
  value: {
    color: string
    className: string
    className2?: string
  }
}

type TextColors = { [key in TextColorName]: string }
type BgColors = { [key in BgColorName]: Color }
type BadgeColors = { [key in BadgeColorName]: Color }
type BulletColors = { [key in BulletColorName]: Color }
type Gradients = { [key in GradientName]: string }

export const textColors: TextColors = {
  gray900: 'text-gray-900 dark:text-gray-100',
  gray800: 'text-gray-800 dark:text-gray-100',
  gray700: 'text-gray-700 dark:text-gray-300',
  gray600: 'text-gray-600 dark:text-gray-400',
  gray500: 'text-gray-500 dark:text-gray-400',
  purple500: 'text-purple-500 dark:text-purple-300',
}

export const bgColors: BgColors = {
  none: {
    label: 'None',
    value: { color: 'transparent', className: 'bg-transparent' },
  },
  white: {
    label: 'White',
    value: { color: '#fff', className: 'bg-white dark:bg-gray-900' },
  },
  light: {
    label: 'Light',
    value: { color: '#f9fafb', className: 'bg-light-100' },
  },
  gray: {
    label: 'Gray',
    value: { color: '#f3f4f6', className: 'bg-gray-100' },
  },
  lightBlue: {
    label: 'Light Blue',
    value: { color: '#e0f2fe', className: 'bg-sky-100' },
  },
  orange: {
    label: 'Orange',
    value: { color: '#fef3c7', className: 'bg-amber-100' },
  },
  green: {
    label: 'Green',
    value: { color: '#ecfccb', className: 'bg-lime-100' },
  },
  accent:{
    label: 'Accent',
    value: { color: '#c574e8', className: 'bg-accent-dark-200' },
  },
  red:{
    label: 'Red',
    value: { color: '#FF4365', className: 'bg-aimbotsRed-100' },
  },
  cyan:{
    label: 'Cyan',
    value: { color: '#63ADB7', className: 'bg-aimbotsGreen-100' },
  },
  purple: {
    label: 'Purple',
    value: { color: '#401F68', className: 'bg-aimbotsPurple-100' },
  },
  purple200:{
    label: 'Purple 200',
    value: { color: '#651AB7', className: 'bg-accent-dark-800' },
  },
  darkBlue: {
    label: 'Dark Blue',
    value: { color: '#10151F', className: 'bg-aimbotsDark-100' },
  },
  darkBlue200: {
    label: 'Dark Blue 200',
    value: { color: '#1E242E', className: 'bg-aimbotsDark-200' },
  },
  dark: {
    label: 'Dark',
    value: { color: '#11081F', className: 'bg-gray-900' },
  },
  black: {
    label: 'Black',
    value: { color: '#000', className: 'bg-black' },
  }
}

export const DefaultColors = Object.keys(bgColors).map((key) => bgColors[key]);

export const badgeColors: BadgeColors = {
  gray: {
    label: 'Gray',
    value: { color: '#6b7280', className: 'text-gray-500 dark:text-gray-400' },
  },
  pink: {
    label: 'pink',
    value: {
      color: '#f472b6',
      className: 'text-pink-400 dark:text-pink-300',
    },
  },
  green: {
    label: 'Green',
    value: {
      color: '#84cc16',
      className: 'text-lime-500 dark:text-lime-300',
    },
  },
  blue: {
    label: 'Blue',
    value: { color: '#60a5fa', className: 'text-blue-400 dark:text-blue-300' },
  },
}

export const bulletColors: BulletColors = {
  pink: {
    label: 'pink',
    value: {
      color: '#ec4899',
      className: 'bg-pink-500 text-white',
      className2: 'text-pink-500',
    },
  },
  pinkLight: {
    label: 'Light pink',
    value: {
      color: '#fce7f3',
      className: 'bg-pink-100 text-pink-500 dark:bg-pink-500 dark:text-white',
      className2: 'text-pink-500',
    },
  },
  azure: {
    label: 'Azure',
    value: {
      color: '#0ea5e9',
      className: 'bg-sky-500 text-white',
      className2: 'text-sky-500',
    },
  },
  azureLight: {
    label: 'Light blue',
    value: {
      color: '#e0f2fe',
      className: 'bg-sky-100 text-sky-500 dark:bg-sky-500 dark:text-white',
      className2: 'text-sky-500',
    },
  },
  green: {
    label: 'Green',
    value: {
      color: '#84cc16',
      className: 'bg-lime-500 text-white',
      className2: 'text-lime-600',
    },
  },
  greenLight: {
    label: 'Green light',
    value: {
      color: '#d9f99d',
      className: 'bg-lime-200 text-lime-600 dark:bg-lime-500 dark:text-white',
      className2: 'text-lime-600',
    },
  },
}

export const gradients: Gradients = {
  ocean: 'from-blue-500 to-teal-400',
  violet: 'from-purple-700 to-pink-500',
  sun: 'from-red-500 to-yellow-400',
  none: '',
}