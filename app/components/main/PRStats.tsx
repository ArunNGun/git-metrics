// @ts-ignore
import { usePRStore } from '../../store'
import { Banner,Table, TableCell, TableContainer, TableHeader, TableRow } from '../../globalStyles'
import Scrollbars from 'react-custom-scrollbars-2'
import styled from 'styled-components'

const StatsContainer = styled.div`
  max-height: 80vh;
  height: 80vh;
  @media (max-width: 767px) {
    max-height: 80vh;
    height: 80vh;
    }
`
const PRStats = ({ activeTab }:any) => {
    const repoMetrics = usePRStore(state => state.repoMetrics)
    const openPRData = usePRStore(state => state.openPRData)
    const isFetching = usePRStore(state => state.isFetching)
  
    const header = (tab:string) => {
      return tab === 'metrics'
        ? [
            'Reviewer/Developer',
            'Total commented PRS',
            'Total submitted PRS',
            'Total reviewed PRS',
            'Avg. review time(hrs)'
          ]
        : ['Title', 'Author', 'Age(in days)']
    }
  
    const TableBody = ({ tab }:any) => {
      return tab === 'metrics'
        ? (repoMetrics?.length
            ? repoMetrics?.map((pullReq:any, index:number) => (
            <TableRow key={index}>
              <TableCell >{pullReq.developer}</TableCell>
              <TableCell >{pullReq.totalCommentedPRS}</TableCell>
              <TableCell >{pullReq.totalSubmittedPRS}</TableCell>
              <TableCell >{pullReq.totalReviewedPRS}</TableCell>
              <TableCell >{pullReq.averageReviewTime === 0 ? 0 : Math.round((((pullReq.averageReviewTime) / 60)/24))}</TableCell>
            </TableRow>
            ))
            :<Banner>
                <h4 style={{ color: '#ffff' }}>No Data available! Please check the filters</h4>
            </Banner>
          )
        : (
            openPRData?.length
              ? openPRData?.map((pr:any) => (
              <TableRow key={pr.id}>
                <TableCell ><a href={pr.url} style={{ color: '#ffff' }} target="_blank" rel="noreferrer" >{pr.prTitle}</a></TableCell>
                <TableCell >{pr.author}</TableCell>
                <TableCell >{Math.ceil(pr.timeLapsed)}</TableCell>
              </TableRow>
              ))
              : 
              <Banner>
                  <h4 style={{ color: '#ffff' }}>no open PRs</h4>
              </Banner>
          )
    }
  
    return (
      <StatsContainer>
        {isFetching
          ? <div style={{ width: '100%', height: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
           Loading...
          </div>
          : (<div style={{ maxHeight: '80vh', height: '80vh', padding: '4px', border: '1px solid #4f4f50', borderRadius: '10px' }}>
            <Scrollbars
          autoHeightMin={'30vh'}
          autoHeightMax={'80vh'}
          renderThumbVertical={props => < div {...props} className="thumb-vertical"/>}
          >
  
            <TableContainer>
              <Table>
                <thead>
                  <TableRow>
                    {header(activeTab).map(heading => (
                      <TableHeader key={heading}>{heading}</TableHeader>
                    ))}
                  </TableRow>
                </thead>
                <tbody>
                  <TableBody tab={activeTab} />
                </tbody>
              </Table>
            </TableContainer>
                      </Scrollbars>
                      </div>
            )
        }
      </StatsContainer>
  
    )
  }

  export default PRStats
