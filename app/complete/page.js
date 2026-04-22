'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { applyTheme, loadSettings } from '../../lib/theme'

// ✅ 실제 설문 링크로 교체하세요
const SURVEY_LINKS = {
  EN: 'https://docs.google.com/forms/d/e/1FAIpQLScVljr3LcIKTukuAcGcsNY0MDE5vBQRlQR1I5kwieEJo7L_BQ/viewform',
  KO: 'https://docs.google.com/forms/d/e/1FAIpQLSfHwfc_yGBr-SW39cb5BSTo3-4um0HS5BOH-OgQaY6jPDq1vA/viewform',
}

const TEXT = {
  EN: {
    badge: 'Thank you',
    title: 'Test Complete',
    subtitle: 'Thank you for participating in the\nexperiment. Please respond to\nthe survey.',
    surveyBtn: 'Go to the survey',
  },
  KO: {
    badge: '감사합니다',
    title: '테스트 완료',
    subtitle: '실험에 참여해 주셔서 감사합니다.\n설문에 응답해 주세요.',
    surveyBtn: '설문 참여하기',
  },
}

export default function CompletePage() {
  const router = useRouter()
  const [lang, setLang] = useState('EN')

  useEffect(() => {
    const { type, lang: savedLang } = loadSettings()
    setLang(savedLang)
    applyTheme(type)
  }, [])

  const t = TEXT[lang]

  return (
    <div className="page-container">
      <div className="header">
        <button className="home-icon" onClick={() => router.push('/')}>⌂</button>
      </div>

      <div className="content" style={{ justifyContent: 'center', paddingTop: '80px' }}>
        <span className="badge">{t.badge}</span>
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle" style={{ whiteSpace: 'pre-line' }}>{t.subtitle}</p>
      </div>

      <div className="bottom-btn">
        <button className="btn-primary" onClick={() => window.open(SURVEY_LINKS[lang], '_blank')}>
          {t.surveyBtn}
        </button>
      </div>
    </div>
  )
}