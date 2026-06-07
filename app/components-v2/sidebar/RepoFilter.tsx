"use client"
import { usePRStore } from '@/app/store'

const RepoFilter = () => {
  const repoName = usePRStore(state => state.repoName)
  const setRepoName = usePRStore(state => state.setRepoName)
  const repos = usePRStore(state => state.repos)
  const isFetchingRepos = usePRStore(state => state.isFetchingRepos)

  if (isFetchingRepos) {
    return (
      <div className="gm-filter-loading">
        <div className="gm-spinner" />
        <span>Loading repos...</span>
      </div>
    )
  }

  return (
    <div className="gm-filter-list-inner">
      <p className="gm-input-label" style={{ marginBottom: '8px' }}>Select a repository</p>
      {repos?.length === 0 && (
        <p className="gm-empty-filter">No repositories found</p>
      )}
      {repos?.map((el: string) => (
        <label key={el} className={`gm-radio-item ${repoName === el ? 'gm-radio-item-active' : ''}`}>
          <input
            type="radio"
            value={el}
            checked={repoName === el}
            onChange={(e) => setRepoName(e.target.value)}
            className="gm-radio-input"
          />
          <span className="gm-radio-dot" />
          <span className="gm-radio-label">{el}</span>
        </label>
      ))}
    </div>
  )
}

export default RepoFilter
