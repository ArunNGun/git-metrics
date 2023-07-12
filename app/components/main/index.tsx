"use client"
import { usePRStore } from "@/app/store";
import { useState } from "react";
import PRStats from './PRStats'
import Tabs from "../tabs";
import UserData from "./UserData";

const Main = () => {
    const [activeTab, setActiveTab] = useState('metrics')
    const filterTab = usePRStore((state) => state.filterTab)
    return ( <>
     {
                  filterTab === 'repos'
                    ? (
                      <div style={{ backgroundColor: '#323336', border: '1px solid #7a828e', padding: '16px', borderRadius: '10px', marginTop: '8px' }}>
                        <Tabs
                          onChange={(value:any) => setActiveTab(value)}
                          value={activeTab}
                          variant={{ inverse: true }}
                          items={[
                            { label: 'Metrics', id: 'metrics' },
                            { label: 'Open PRs', id: 'prs' }
                          ]}
                        />
                        <PRStats activeTab={activeTab} />
                        
                      </div>
                      )
                    : (<div style={{ backgroundColor: '#323336', border: '1px solid #7a828e', padding: '16px', borderRadius: '10px', marginTop: '8px' }}>
                      <UserData />
                    </div>)
                }
    </> );
}
 
export default Main;