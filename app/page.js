'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { applyTheme, loadSettings } from '../lib/theme'

const TEXT = {
  EN: {
    badge: 'EXPERIMENT 2026',
    title: 'Usability Test',
    subtitle: 'You will complete two short tasks.',
    description: 'This research study examines user interaction patterns. Your participation is anonymous and will take approximately 5 minutes',
    startBtn: 'Start Test →',
  },
  KO: {
    badge: '실험 2026',
    title: '사용성 테스트',
    subtitle: '두 가지 짧은 과제를 수행하게 됩니다.',
    description: '이 연구는 사용자 인터랙션 패턴을 조사합니다. 참여는 익명으로 이루어지며 약 5분이 소요됩니다.',
    startBtn: '테스트 시작 →',
  },
}

const TYPES = [
  { value: '1', label: 'Type 1 (Light)' },
  { value: '2', label: 'Type 2 (Dark)' },
  { value: '3', label: 'Type 3 (Light)' },
  { value: '4', label: 'Type 4 (Dark)' },
]

function HomeInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [lang, setLang] = useState('EN')
  const [type, setType] = useState('1')

  useEffect(() => {
    const urlType = searchParams.get('type')
    const urlLang = searchParams.get('lang')
    const saved = loadSettings()
    const finalType = urlType || saved.type
    const finalLang = urlLang || saved.lang

    setType(finalType)
    setLang(finalLang)
    localStorage.setItem('exp_type', finalType)
    localStorage.setItem('exp_lang', finalLang)
    applyTheme(finalType)
  }, [])

  const handleTypeChange = (val) => {
    setType(val)
    localStorage.setItem('exp_type', val)
    applyTheme(val)
  }

  const handleLangToggle = () => {
    const next = lang === 'EN' ? 'KO' : 'EN'
    setLang(next)
    localStorage.setItem('exp_lang', next)
  }

  const t = TEXT[lang]
  const isKO = lang === 'KO'

  return (
    <div className="page-container">
      <div className="header">
        <span className="header-title">Research Project</span>
      </div>

      <div className="content" style={{ justifyContent: 'center', paddingTop: '60px' }}>
        <span className="badge">{t.badge}</span>
        <h1 className="page-title">{t.title}</h1>
        <p className="page-subtitle">{t.subtitle}</p>
        <div className="info-card">{t.description}</div>

        <div className="controls-row">
          <div className="select-wrapper">
            <select
              className="type-select"
              value={type}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              {TYPES.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
            <span className="select-arrow">▼</span>
          </div>

          <div className="lang-toggle">
            <span className={`lang-label ${!isKO ? 'active' : 'inactive'}`}>EN</span>
            <button className="toggle-track" onClick={handleLangToggle}>
              <span className={`toggle-thumb ${isKO ? 'on' : ''}`} />
            </button>
            <span className={`lang-label ${isKO ? 'active' : 'inactive'}`}>KO</span>
          </div>
        </div>
      </div>

      <div className="bottom-btn">
        <button className="btn-primary" onClick={() => router.push('/instruction')}>
          {t.startBtn}
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg)' }} />}>
      <HomeInner />
    </Suspense>
  )
}