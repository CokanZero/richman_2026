// lib/theme.js

export function getThemeByType(type) {
  return ['2', '4'].includes(String(type)) ? 'dark' : 'light'
}

export function applyTheme(type) {
  const theme = getThemeByType(type)
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('exp_theme', theme)
  return theme
}

export function loadSettings() {
  return {
    type: localStorage.getItem('exp_type') || '1',
    lang: localStorage.getItem('exp_lang') || 'EN',
    theme: localStorage.getItem('exp_theme') || 'light',
  }
}