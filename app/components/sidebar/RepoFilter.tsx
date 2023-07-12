import React from 'react'
import { usePRStore } from '../../store'
import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars-2'

const SORTED_REPOS =["repoA","repoB"]
const RepoFilter = () => {
  const repoName = usePRStore(state => state.repoName)
  const setRepoName = usePRStore(state => state.setRepoName)
  const repos = usePRStore(state => state.repos)
  const isFetchingRepos = usePRStore(state => state.isFetchingRepos)
  const onChange = (checkedId: string) => {
    setRepoName(checkedId)
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
{isFetchingRepos?<h3 style={{color:'#fff'}}>Loading...</h3>:
        <div className="radio-container">

        {
          repos?.map((el:string) =>(
            <label key={el} className='radio-label'>
                    <input style={{marginRight:'8px'}} type="radio" value={el} checked={repoName === el} onChange={(e)=>onChange(e.target.value)}/>
                    {el}
                </label>
            ))
          }
        </div>
          }
        </div>
          </Scrollbars>
          </div>

  )
}

export default RepoFilter