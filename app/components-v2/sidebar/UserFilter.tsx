"use client"
import { usePRStore } from '@/app/store'

const UserFilter = () => {
  const selectedUser = usePRStore(state => state.selectedUser)
  const setSelectedUser = usePRStore(state => state.setSelectedUser)
  const setSelectedUserData = usePRStore(state => state.setSelectedUserData)
  const gitUsers = usePRStore(state => state.gitUsers)
  const isFetchingUsers = usePRStore(state => state.isFetchingUsers)

  const onUserChange = (checkedId: any) => {
    setSelectedUserData([])
    setSelectedUser(checkedId)
  }

  if (isFetchingUsers) {
    return (
      <div className="gm-filter-loading">
        <div className="gm-spinner" />
        <span>Loading users...</span>
      </div>
    )
  }

  return (
    <div className="gm-filter-list-inner">
      <p className="gm-input-label" style={{ marginBottom: '8px' }}>Select a user</p>
      {gitUsers?.length === 0 && (
        <p className="gm-empty-filter">No users found</p>
      )}
      {gitUsers?.map((el: any) => (
        <label key={el.id} className={`gm-radio-item ${selectedUser === el.id ? 'gm-radio-item-active' : ''}`}>
          <input
            type="radio"
            value={el.id}
            checked={selectedUser === el.id}
            onChange={(e) => onUserChange(e.target.value)}
            className="gm-radio-input"
          />
          <span className="gm-radio-dot" />
          <span className="gm-radio-label">{el.id}</span>
        </label>
      ))}
    </div>
  )
}

export default UserFilter
