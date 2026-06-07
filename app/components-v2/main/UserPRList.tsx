"use client"
import { usePRStore } from '@/app/store'

const UserPRList = ({ reviewed = true }) => {
  const selectedUserData = usePRStore((state: any) => state.selectedUserData)
  const data = reviewed ? selectedUserData?.reviewedPRData : selectedUserData?.raisedPRData

  return (
    <div className="gm-pr-list-section">
      <h3 className="gm-pr-list-title">
        <span className={`gm-pr-type-dot ${reviewed ? 'gm-dot-reviewed' : 'gm-dot-raised'}`} />
        {reviewed ? 'Reviewed' : 'Raised'} Pull Requests
        {data?.length > 0 && <span className="gm-count-pill">{data.length}</span>}
      </h3>

      {!data || data?.length === 0 ? (
        <div className="gm-empty-state gm-empty-state-sm">
          <p>No PRs {reviewed ? 'reviewed' : 'raised'} in this time frame</p>
        </div>
      ) : (
        <div className="gm-table-wrap">
          <table className="gm-table">
            <thead>
              <tr>
                <th>Pull Request</th>
                <th>State</th>
                {!reviewed && <th>Comments</th>}
                <th>Age (days)</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((pr: any) => (
                <tr key={pr.title}>
                  <td>
                    <a href={pr.url} target="_blank" rel="noreferrer" className="gm-pr-link">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0}}>
                        <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 012 2v7M6 9v12"/>
                      </svg>
                      {pr.title}
                    </a>
                  </td>
                  <td>
                    <span className={`gm-state-badge gm-state-${pr.state?.toLowerCase()}`}>{pr.state}</span>
                  </td>
                  {!reviewed && <td><span className="gm-badge">{pr.comments}</span></td>}
                  <td><span className="gm-badge">{pr.prLife}d</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserPRList
