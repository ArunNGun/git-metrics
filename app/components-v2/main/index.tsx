"use client"
import { useState } from 'react'
import { usePRStore } from '@/app/store'
import PRStats from './PRStats'
import UserData from './UserData'
import Tabs from '../tabs'

const Main = () => {
  const [activeTab, setActiveTab] = useState('metrics')
  const filterTab = usePRStore(state => state.filterTab)

  return (
    <main className="gm-main">
      {filterTab === 'repos' ? (
        <div className="gm-main-inner">
          <div className="gm-main-tabs">
            <Tabs
              onChange={(value: string) => setActiveTab(value)}
              value={activeTab}
              items={[
                { label: 'Metrics', id: 'metrics' },
                { label: 'Open PRs', id: 'prs' }
              ]}
            />
          </div>
          <PRStats activeTab={activeTab} />
        </div>
      ) : (
        <div className="gm-main-inner">
          <UserData />
        </div>
      )}
    </main>
  )
}

export default Main
