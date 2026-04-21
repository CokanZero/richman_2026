// lib/useAppSettings.js
// 언어(lang)와 테마(theme)를 localStorage에 저장하고 불러오는 커스텀 훅

'use client'
import { useState, useEffect } from 'react'

export function useAppSettings() {
  const [lang, setLangState] = useState('EN')
  const [theme, setThemeState] = useState('light')

  // 초기 로드: localStorage에서 읽기
  useEffect(() => {
    const savedLang  = localStorage.getItem('exp_lang')  || 'EN'
    const savedTheme = localStorage.getItem('exp_theme') || 'light'
    setLangState(savedLang)
    setThemeState(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  // 언어 변경
  const setLang = (val) => {
    setLangState(val)
    localStorage.setItem('exp_lang', val)
  }

  // 테마 변경
  const setTheme = (val) => {
    setThemeState(val)
    localStorage.setItem('exp_theme', val)
    document.documentElement.setAttribute('data-theme', val)
  }

  return { lang, setLang, theme, setTheme }
}

// 타입 → 테마 매핑
// Type 1: Light-Light  → 홈·이후 모두 light
// Type 2: Light-Dark   → 홈만 light, 이후 dark  (홈에서 start 누를 때 dark 전환)
// Type 3: Dark-Light   → 홈 dark, 이후 light
// Type 4: Dark-Dark    → 홈·이후 모두 dark
export const TYPE_HOME_THEME = {
  '1': 'light',
  '2': 'light',
  '3': 'dark',
  '4': 'dark',
}

export const TYPE_TASK_THEME = {
  '1': 'light',
  '2': 'dark',
  '3': 'light',
  '4': 'dark',
}