import { useEffect, useState } from 'react'

function PageWrapper({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.7s ease',
    }}>
      {children}
    </div>
  )
}

export default PageWrapper