const isDark = Boolean(document.body.getAttribute('data-theme')) == true

const redColor = '#e63946'
const postColor = isDark ? 'rgba(30, 30, 30)' : 'rgba(219, 219, 219)'
const grayColor = isDark ? '#353535' : '#bbbbbb'
const bodyColor = isDark ? '#0e0e0e' : '#c0c0c0'

const Button = {
  colorPrimary: redColor,
  colorPrimaryHover: redColor,
  colorPrimaryActive: redColor,
  colorTextDisabled: 'rgb(240, 240, 240)',
  marginXS: 0,
}

const Input = {
  colorPrimary: redColor,
  colorPrimaryHover: redColor,
  colorPrimaryActive: redColor,
  colorText: 'rgba(255, 255, 255, 0.9)',
  colorTextPlaceholder: 'rgba(255, 255, 255, 0.5)',
  borderRadius: 9,
  colorBgContainer: '#646363d0',
}

const List = {
  itemPadding: '5px 0',
  colorText: '#fff',
  colorPrimary: redColor,
}

const Modal = {
  contentBg: postColor,
  headerBg: 'transparent',
  footerBg: 'transparent',
  titleColor: '#fff',
  colorText: '#fff',
}

const Select = {
  colorPrimary: redColor,
  colorPrimaryHover: redColor,
  colorBgElevated: bodyColor,
  clearBg: bodyColor,
  selectorBg: bodyColor,
  colorText: '#fff',
  optionSelectedBg: redColor,
  optionPadding: '8px 15px',
  colorTextDescription: '#fff',
  optionSelectedColor: '#fff',
}

const Menu = {
  darkItemBg: redColor,
  darkItemSelectedBg: redColor,
  itemMarginInline: 6,
}

const Spin = {
  colorPrimary: redColor,
}

const Dropdown = {
  colorBgElevated: grayColor,
  colorText: '#fff',
  zIndexPopup: 100,
}

export const config = {
  Button,
  Input,
  List,
  Modal,
  Select,
  Menu,
  Spin,
  Dropdown,
}
