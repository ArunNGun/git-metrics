"use client"
import { usePRStore } from '@/app/store'
import UserPRList from './UserPRList'

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="gm-stat-card">
    <p className="gm-stat-label">{label}</p>
    <p className="gm-stat-value">{value}</p>
  </div>
)

const UserData = () => {
  const isFetchingUserPRs = usePRStore(state => state.isFetchingUserPRs)
  const selectedUserData = usePRStore(state => state.selectedUserData)
  const selectedUser = usePRStore(state => state.selectedUser)

  if (isFetchingUserPRs) {
    return (
      <div className="gm-loading-state">
        <div className="gm-spinner gm-spinner-lg" />
        <p>Fetching user data...</p>
      </div>
    )
  }

  if (!selectedUserData || Object.keys(selectedUserData).length === 0) {
    return (
      <div className="gm-empty-state gm-empty-state-full">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.35">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        <p>Select a user and run the query to see their PR activity.</p>
      </div>
    )
  }

  return (
    <div className="gm-user-data">
      <div className="gm-user-header">
        <div className="gm-user-avatar-lg">{selectedUser?.[0]?.toUpperCase()}</div>
        <div>
          <h2 className="gm-user-name">{selectedUser}</h2>
          <p className="gm-user-sub">Pull request activity</p>
        </div>
      </div>

      <div className="gm-stat-cards">
        <StatCard label="PRs Raised" value={selectedUserData.totalRaisedPRs ?? 0} />
        <StatCard label="PRs Reviewed" value={selectedUserData.totalReviewedPRS ?? 0} />
        <StatCard label="Avg Review Time" value={`${selectedUserData.avgReviewTime ?? 0} days`} />
      </div>

      <UserPRList reviewed={true} />
      <UserPRList reviewed={false} />
    </div>
  )
}

export default UserData
