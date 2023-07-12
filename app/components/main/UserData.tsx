import React from 'react'
import { usePRStore } from '../../store'
import UserPRList from './UserPRList'
import { Table, TableCell, TableContainer, TableHeader, TableRow, Banner } from '../../globalStyles'

const UserData = () => {
  const isFetchingUserPRs = usePRStore(state => state.isFetchingUserPRs)
  const selectedUserData = usePRStore(state => state.selectedUserData)
  const selectedUser = usePRStore(state => state.selectedUser)

  return (<>
    {isFetchingUserPRs
      ? (<div style={{ width: '100%', height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        Loading...
      </div>)
      : (Object.keys(selectedUserData).length !== 0
          ? (<div id="user-data-container" style={{}}>
          <>
            <h3 >{`PR raised: ${selectedUserData.totalRaisedPRs}`}</h3>
            <h3 >{`PR reviewed: ${selectedUserData.totalReviewedPRS}`}</h3>
            <h3 >{`Avg review-time: ${selectedUserData.avgReviewTime} days`}</h3>
          </>
          <div style={{ padding: '4px', border: '1px solid #4f4f50', borderRadius: '10px' }}>

          <TableContainer>

          <Table>
            <thead>
            <TableRow>
            <TableHeader>UserName</TableHeader>
            <TableHeader>Total PR raised</TableHeader>
            <TableHeader>Total PR reviewed</TableHeader>
            <TableHeader>Avg review time(in days)</TableHeader>
            </TableRow>
            </thead>
            <tbody>
              <TableRow >
                <TableCell ><h3 style={{ color: '#f0b72f' }}>{selectedUser}</h3></TableCell>
                <TableCell >{selectedUserData.totalRaisedPRs}</TableCell>
                <TableCell >{selectedUserData.totalReviewedPRS}</TableCell>
                <TableCell >{selectedUserData.avgReviewTime}</TableCell>
              </TableRow>
            </tbody>
          </Table>
          </TableContainer>
          </div>
          <UserPRList reviewed={true} />
          <UserPRList reviewed={false} />
        </div>)
          : (<Banner><h3 style={{ color: '#ffff' }}>No Data available! Please Check the Filters</h3></Banner>))
    }
  </>
  )
}

export default UserData
