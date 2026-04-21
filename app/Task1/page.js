'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { applyTheme, loadSettings } from '../../lib/theme'

const TEXT = {
  EN: {
    badge: 'Step 1',
    title: 'Instructions',
    subtitle: 'You will complete two short tasks\non your mobile device.',
    beginBtn: 'Begin →',
  },
  KO: {
    badge: '1단계',
    title: '안내사항',
    subtitle: '모바일 기기에서\n두 가지 짧은 과제를 수행하게 됩니다.',
    beginBtn: '시작 →',
  },
}

export default function Task1Page() {
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
        <button className="back-btn" onClick={() => router.back()}>‹</button>
      </div>

      <div className="content" style={{ justifyContent: 'center', paddingTop: '60px' }}>
        <span className="badge">{t.badge}</span>
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle" style={{ whiteSpace: 'pre-line' }}>{t.subtitle}</p>
      </div>

      <div className="bottom-btn">
        <button className="btn-primary" onClick={() => router.push('/reading')}>
          {t.beginBtn}
        </button>
      </div>
    </div>
  )
}