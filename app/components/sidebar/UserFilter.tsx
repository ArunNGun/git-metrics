// import { usePRStore } from './store'
// ts-ignore
import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { usePRStore } from '@/app/store'

const FilterContainer = styled.div`
  max-height: 60vh;
  height: 60vh;
  @media (max-width: 767px) {
    max-height: 30vh;
    }
 `
// const GIT_USERS = ["arun","varun","tarun"]
const UserFilter = () => {
  const selectedUser = usePRStore(state => state.selectedUser)
  const setSelectedUser = usePRStore(state => state.setSelectedUser)
  const setSelectedUserData = usePRStore(state => state.setSelectedUserData)
  const gitUsers = usePRStore(state => state.gitUsers)

  const onUserChange = (checkedId: any) => {
    setSelectedUserData([])
    setSelectedUser(checkedId)
  }

  return (
    <div className='filterContainer'>
        <Scrollbars
        autoHeightMin={'30vh'}
        autoHeightMax={'80vh'}
        renderThumbVertical={props => < div {...props} className="thumb-vertical"/>}
        >

        <div className='filter-actions'>
        <h1 className='radio-legend'>Please select a repo</h1>
        <div className="radio-container">

        {
            gitUsers?.map((el:any) =>(
                <label key={el.id} className='radio-label'>
                    <input style={{marginRight:'8px'}} type="radio" value={el.id} checked={selectedUser === el.id} onChange={(e)=>onUserChange(e.target.value)}/>
                    {el.id}
                </label>
            ))
        }
        </div>
        </div>
        
          </Scrollbars>
      </div>
  )
}

export default UserFilter
