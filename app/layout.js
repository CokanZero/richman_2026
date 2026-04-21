import './globals.css'

export const metadata = {
  title: 'Usability Test',
  description: 'Research Project - Experiment 2026',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}