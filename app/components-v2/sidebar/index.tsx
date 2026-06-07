"use client"
import { useEffect } from 'react'
import { usePRStore } from '@/app/store'
import Tabs from '../tabs'
import RepoFilter from './RepoFilter'
import UserFilter from './UserFilter'

const Sidebar = () => {
  const filterTab = usePRStore(state => state.filterTab)
  const setFilterTab = usePRStore(state => state.setFilterTab)
  const fetchUsers = usePRStore(state => state.fetchUsers)
  const fetchRepos = usePRStore(state => state.fetchRepos)
  const fetchUserPRs = usePRStore(state => state.fetchUserPRs)
  const fetchPRStats = usePRStore(state => state.fetchPRStats)
  const fromDate = usePRStore(state => state.fromDate)
  const toDate = usePRStore(state => state.toDate)
  const setFromDate = usePRStore(state => state.setFromDate)
  const setToDate = usePRStore(state => state.setToDate)

  const handleSearch = () => {
    if (filterTab === 'users') {
      fetchUserPRs()
    } else {
      fetchPRStats()
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchRepos()
  }, [])

  return (
    <aside className="gm-sidebar">
      <div className="gm-sidebar-section">
        <p className="gm-section-label">Date Range</p>
        <div className="gm-date-inputs">
          <div className="gm-date-field">
            <label className="gm-input-label">From</label>
            <input
              type="date"
              className="gm-input"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="gm-date-field">
            <label className="gm-input-label">To</label>
            <input
              type="date"
              className="gm-input"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="gm-sidebar-section">
        <p className="gm-section-label">Filter by</p>
        <Tabs
          onChange={(value: string) => setFilterTab(value)}
          value={filterTab}
          items={[
            { label: 'Repos', id: 'repos' },
            { label: 'Users', id: 'users' }
          ]}
        />
      </div>

      <div className="gm-sidebar-section gm-filter-list">
        {filterTab === 'repos' ? <RepoFilter /> : <UserFilter />}
      </div>

      <div className="gm-sidebar-footer">
        <button className="gm-search-btn" onClick={handleSearch}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          Run Query
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
