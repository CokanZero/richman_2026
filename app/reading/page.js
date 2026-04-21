'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { applyTheme, loadSettings } from '../../lib/theme'

const TEXT = {
  EN: {
    cardLabel: 'Reading Task',
    cardDesc: 'After reading this article, please press the button below.',
    articleTitle: 'Mobile Interfaces and User Experience',
    articleBody: `Mobile interfaces are used in many parts of everyday life and play an important role in communication, learning, and online services. As digital environments become more common, interface readability and usability are becoming increasingly important factors in user experience. Designers often provide both light mode and dark mode to improve visual comfort in different contexts. This study explores how interface themes may influence reading experience and task performance in mobile environments.`,
    readingBtn: 'Reading Complete',
  },
  KO: {
    cardLabel: '읽기 과제',
    cardDesc: '아래 글을 읽은 후, 하단 버튼을 눌러주세요.',
    articleTitle: '모바일 인터페이스와 사용자 경험',
    articleBody: `모바일 인터페이스는 일상생활의 다양한 영역에서 활용되며 의사소통, 학습, 온라인 서비스에서 중요한 역할을 합니다. 디지털 환경이 보편화됨에 따라 인터페이스의 가독성과 사용성은 사용자 경험에서 점점 중요한 요소가 되고 있습니다. 디자이너들은 다양한 상황에서 시각적 편의를 높이기 위해 라이트 모드와 다크 모드를 함께 제공하는 경우가 많습니다. 이 연구는 인터페이스 테마가 모바일 환경에서의 읽기 경험과 과제 수행에 어떤 영향을 미치는지 탐구합니다.`,
    readingBtn: '읽기 완료',
  },
}

export default function ReadingPage() {
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
        <span className="header-center">Step 1</span>
      </div>

      <div className="content" style={{ paddingTop: '24px' }}>
        <div className="info-card" style={{ marginBottom: 28 }}>
          <span className="card-label">{t.cardLabel}</span>
          {t.cardDesc}
        </div>

        <div className="reading-content">
          <h2>{t.articleTitle}</h2>
          <p>{t.articleBody}</p>
        </div>
      </div>

      <div className="bottom-btn">
        <button className="btn-primary" onClick={() => router.push('/usability')}>
          {t.readingBtn}
        </button>
      </div>
    </div>
  )
}