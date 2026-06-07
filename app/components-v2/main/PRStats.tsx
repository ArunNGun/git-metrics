"use client"
import { usePRStore } from '@/app/store'

const PRStats = ({ activeTab }: any) => {
  const repoMetrics = usePRStore(state => state.repoMetrics)
  const openPRData = usePRStore(state => state.openPRData)
  const isFetching = usePRStore(state => state.isFetching)

  if (isFetching) {
    return (
      <div className="gm-loading-state">
        <div className="gm-spinner gm-spinner-lg" />
        <p>Fetching PR data...</p>
      </div>
    )
  }

  if (activeTab === 'metrics') {
    return (
      <div className="gm-table-wrap">
        {repoMetrics?.length === 0 ? (
          <div className="gm-empty-state">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
            </svg>
            <p>No data. Select a repo and run the query.</p>
          </div>
        ) : (
          <table className="gm-table">
            <thead>
              <tr>
                <th>Developer</th>
                <th>Commented PRs</th>
                <th>Submitted PRs</th>
                <th>Reviewed PRs</th>
                <th>Avg Review Time</th>
              </tr>
            </thead>
            <tbody>
              {repoMetrics?.map((row: any, i: number) => (
                <tr key={i}>
                  <td>
                    <div className="gm-developer-cell">
                      <div className="gm-avatar">{row.developer?.[0]?.toUpperCase()}</div>
                      <span>{row.developer}</span>
                    </div>
                  </td>
                  <td><span className="gm-badge">{row.totalCommentedPRS}</span></td>
                  <td><span className="gm-badge">{row.totalSubmittedPRS}</span></td>
                  <td><span className="gm-badge gm-badge-accent">{row.totalReviewedPRS}</span></td>
                  <td>
                    <span className="gm-time-badge">
                      {row.averageReviewTime === 0 ? '0' : Math.round((row.averageReviewTime / 60) / 24)} hrs
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    )
  }

  // Open PRs tab
  return (
    <div className="gm-table-wrap">
      {openPRData?.length === 0 ? (
        <div className="gm-empty-state">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
          </svg>
          <p>No open PRs in this period.</p>
        </div>
      ) : (
        <table className="gm-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Age (days)</th>
            </tr>
          </thead>
          <tbody>
            {openPRData?.map((pr: any) => (
              <tr key={pr.id}>
                <td>
                  <a href={pr.url} target="_blank" rel="noreferrer" className="gm-pr-link">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink:0}}>
                      <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 012 2v7M6 9v12"/>
                    </svg>
                    {pr.prTitle}
                  </a>
                </td>
                <td>
                  <div className="gm-developer-cell">
                    <div className="gm-avatar gm-avatar-sm">{pr.author?.[0]?.toUpperCase()}</div>
                    <span>{pr.author}</span>
                  </div>
                </td>
                <td>
                  <span className={`gm-age-badge ${Math.ceil(pr.timeLapsed) > 7 ? 'gm-age-warn' : ''}`}>
                    {Math.ceil(pr.timeLapsed)}d
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PRStats
