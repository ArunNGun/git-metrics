import React from 'react'
import { usePRStore } from '../../store'
import { Banner, Table, TableCell, TableContainer, TableHeader, TableRow } from '../../globalStyles'
import Scrollbars from 'react-custom-scrollbars-2'

// eslint-disable-next-line react/prop-types
const UserPRList = ({ reviewed = true }) => {
  const selectedUserData = usePRStore((state:any) => state.selectedUserData)
  const data = reviewed ? selectedUserData?.reviewedPRData : selectedUserData?.raisedPRData

  const header = (reviewed: boolean) => {
    const headers = ['Pull Request', 'State']
    !reviewed ? headers.push('Comments', 'Age(days)') : headers.push('Age(days)')
    return headers
  }

  return (
    <div style={{ paddingTop: '8px' }}>
      <h2 >
        {`${reviewed ? 'Reviewed' : 'Raised'} Pull-Request Details`}
      </h2>
      {data?.length === 0
        ? (<Banner>
          {`No PR ${reviewed ? 'reviewed' : 'raised'} in this time frame`}
        </Banner>
        )
        : (<div style={{ maxHeight: '30vh', height: '30vh', marginTop: '4px', padding: '4px', border: '1px solid #4f4f50', borderRadius: '10px' }}>
          <Scrollbars
            autoHeightMin={'30vh'}
            autoHeightMax={'80vh'}
            renderThumbVertical={props => < div {...props} className="thumb-vertical" />}
          >

            <TableContainer>

              <Table>
                <thead>
                  <TableRow>
                    {header(reviewed)?.map(heading => (
                      <TableHeader key={heading}>{heading}</TableHeader>
                    ))}
                  </TableRow>
                </thead>
                <tbody>
                  {
                    data?.map((pr:any) => (
                      <TableRow key={pr.title}>
                        <TableCell ><a href={pr.url} style={{ color: '#ffff' }} target="_blank" rel="noreferrer">{pr.title}</a></TableCell>
                        <TableCell >{pr.state}</TableCell>
                        {reviewed
                          ? (<TableCell >{pr.prLife}</TableCell>
                          )
                          : (<>

                            <TableCell >{pr.comments}</TableCell>
                            <TableCell >{pr.prLife}</TableCell>

                          </>)}
                      </TableRow>
                    ))
                  }
                </tbody>
              </Table>
            </TableContainer>
          </Scrollbars>
        </div>)
      }
    </div>
  )
}

export default UserPRList
