'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { applyTheme, loadSettings } from '../../lib/theme'

const TEXT = {
  EN: {
    cardLabel: 'Usability Task',
    cardDesc: 'Please follow the guide to fill in all the blanks, then click the button below.',
    label1: 'Enter the number',
    placeholder1: '248',
    label2: 'Enter the word',
    placeholder2: 'Sydney',
    label3: 'Choose an option',
    placeholder3: 'Select one',
    options: ['Option A', 'Option B', 'Option C'],
    label4: 'Enter the final number',
    placeholder4: '12',
    submitBtn: 'Submit',
  },
  KO: {
    cardLabel: '사용성 과제',
    cardDesc: '안내에 따라 모든 빈칸을 채운 후, 하단 버튼을 클릭해 주세요.',
    label1: '숫자를 입력하세요',
    placeholder1: '248',
    label2: '단어를 입력하세요',
    placeholder2: '시드니',
    label3: '옵션을 선택하세요',
    placeholder3: '하나를 선택하세요',
    options: ['옵션 A', '옵션 B', '옵션 C'],
    label4: '마지막 숫자를 입력하세요',
    placeholder4: '12',
    submitBtn: '제출',
  },
}

export default function UsabilityPage() {
  const router = useRouter()
  const [lang, setLang] = useState('EN')
  const [number, setNumber]        = useState('')
  const [word, setWord]            = useState('')
  const [option, setOption]        = useState('')
  const [finalNumber, setFinalNum] = useState('')

  useEffect(() => {
    const { type, lang: savedLang } = loadSettings()
    setLang(savedLang)
    applyTheme(type)
  }, [])

  const handleSubmit = () => {
    localStorage.setItem('exp_result', JSON.stringify({ number, word, option, finalNumber }))
    router.push('/complete')
  }

  const t = TEXT[lang]

  return (
    <div className="page-container">
      <div className="header">
        <button className="back-btn" onClick={() => router.back()}>‹</button>
        <span className="header-center">Step 2</span>
      </div>

      <div className="content" style={{ paddingTop: '24px' }}>
        <div className="info-card" style={{ marginBottom: 28 }}>
          <span className="card-label">{t.cardLabel}</span>
          {t.cardDesc}
        </div>

        <div className="form-group">
          <label className="form-label">{t.label1}</label>
          <input className="form-input" type="number" placeholder={t.placeholder1}
            value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">{t.label2}</label>
          <input className="form-input" type="text" placeholder={t.placeholder2}
            value={word} onChange={(e) => setWord(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">{t.label3}</label>
          <div className="form-select-wrapper">
            <select
              className={`form-select ${option ? 'selected' : ''}`}
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="" disabled>{t.placeholder3}</option>
              {t.options.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
            <span className="form-select-arrow">▼</span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{t.label4}</label>
          <input className="form-input" type="number" placeholder={t.placeholder4}
            value={finalNumber} onChange={(e) => setFinalNum(e.target.value)} />
        </div>
      </div>

      <div className="bottom-btn">
        <button className="btn-primary" onClick={handleSubmit}>{t.submitBtn}</button>
      </div>
    </div>
  )
}