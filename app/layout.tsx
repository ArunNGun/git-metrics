export const dynamic = 'force-dynamic'
export const revalidate = 0

import Header from './components-v2/header'
import Sidebar from './components-v2/sidebar'
import './globals.css'

export const metadata = {
  title: 'PR Metrics — GitHub Dashboard',
  description: 'Pull request analytics for your organisation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="gm-shell">
          <Header />
          <div className="gm-body">
            <Sidebar />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
