"use client"
import { useEffect, useState } from "react"
import Tabs from "../tabs"
import RepoFilter from "./RepoFilter"
import UserFilter from "./UserFilter"
import { usePRStore } from "@/app/store"

const Sidebar = () => {
    const filterTab = usePRStore(state => state.filterTab)
    const setFilterTab = usePRStore(state => state.setFilterTab)
    const fetchUsers = usePRStore(state => state.fetchUsers)
    const fetchRepos = usePRStore(state => state.fetchRepos)
    const setToDate = usePRStore(state => state.setToDate)
    const setFromDate = usePRStore(state => state.setFromDate)
    const toDate = usePRStore(state => state.toDate)
    const fromDate = usePRStore(state => state.fromDate)
    const [dateRange, setDateRange] = useState<any>([null, null])
    const [startDate, endDate] = dateRange
    const maxDate = new Date(startDate?.getTime())
    const fetchUserPRs = usePRStore(state => state.fetchUserPRs)
    const fetchPRStats = usePRStore(state => state.fetchPRStats)

    const handleSearch = (activeTab:String) => {
      if (activeTab === 'users') {
        fetchUserPRs()
      } else {
        fetchPRStats()
      }
    }
  
    useEffect(() => {
      fetchUsers()
      fetchRepos()
    }, [])
  
    return (
      <div style={{ backgroundColor: '#323336', border: '1px solid #7a828e', padding: '16px', borderTop: 'none', borderLeft: 'none', borderRadius: '0 10px 10px 0', height:'100%', width:'100%' }}>
        <div id="datepicker" style={{ padding: '4px' }}>
          <div style={{ marginBottom: '4px', border: '1px solid #7a828e', borderRadius: '10px', padding: '8px', backgroundColor: 'currentcolor' }}>
            <h4 style={{ color: '#ffff' }}>Date-range:</h4>
            {/* <h6 style={{ color: '#ffff' }}>{`${moment(fromDate).format('DD-MMM')} to ${moment(toDate).format('DD-MMM')}`}</h6> */}
          </div>
          {/* <DatePicker
            selectsRange={true}
            startDate={startDate}
            minDate={startDate}
            maxDate={startDate ? maxDate?.setDate(maxDate.getDate() + 30) : new Date()}
            endDate={endDate}
            onChange={(update) => {
              setFromDate(update[0])
              setToDate(update[1])
              setDateRange(update)
            }}
            isClearable={true}
          /> */}
        </div>
        <Tabs
          onChange={(value:string) => setFilterTab(value)}
          value={filterTab}
          variant={{ inverse: true }}
          items={[
            { label: 'Repos', id: 'repos' },
            { label: 'Users', id: 'users' }
          ]}
        />
  
        <div style={{ marginBottom: '8px', border: '1px solid #7a828e', borderTop:'0.01px solid #f0b72f', borderRadius: '0 0 10px 10px', backgroundColor: 'currentcolor' }}>
        {filterTab === 'repos'
          ?<RepoFilter />
          :<UserFilter />
        }
        </div>
        <button className="searchButton" onClick={() => handleSearch(filterTab)}>Search</button>
      </div>
    )
  }
  
  export default Sidebar