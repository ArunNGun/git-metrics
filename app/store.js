import { create } from 'zustand'
import axios from 'axios'
import moment from 'moment'

export const usePRStore = create((set, get) => (
  {
    repos: [],
    repoMetrics: [],
    openPRData: [],
    gitUsers: [],
    selectedUser: '',
    selectedUserData: {},
    isFetching: false,
    isFetchingUsers: false,
    isFetchingRepos: false,
    isFetchingUserPRs: false,
    filterTab: 'repos',
    fromDate: moment().subtract(60, 'days').format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    repoName: '',
    setRepoName: (repo) => set({ repoName: repo }),
    setFilterTab: (tab) => set({ filterTab: tab }),
    setIsFetching: (status) => set({ isFetching: status }),
    setFromDate: (date) => set({ fromDate: date }),
    setToDate: (date) => set({ toDate: date }),
    setSelectedUser: (user) => set({ selectedUser: user }),
    setSelectedUserData: (data) => set({ selectedUserData: data }),
    fetchUserPRs: async () => {
      set({ isFetchingUserPRs: true })
      fetch('/api/userPrs?fromDate=' + get().fromDate + '&toDate=' + get().toDate + '&gitUser=' + get().selectedUser)
        .then(response => response.json())
        .then(data => {
          set({ selectedUserData: data })
          set({ isFetchingUserPRs: false })
        })
        .catch(() => {
          set({ selectedUserData: {} })
          set({ isFetchingUserPRs: false })
        })
    },
    fetchUsers: async () => {
      set({ isFetchingUsers: true })
      axios.get('api/users'
      ).then(res => {
        set({ gitUsers: res?.data })
        set({ isFetchingUsers: false })
      }).catch(() => {
        set({ gitUsers: [] })
        set({ isFetchingUsers: false })
      })
    },
    fetchRepos: async () => {
      set({ isFetchingRepos: true })
      axios.get('api/repos'
      ).then(res => {
        set({ repos: res?.data })
        set({ isFetchingRepos: false })
      }).catch(() => {
        set({ repos: [] })
        set({ isFetchingRepos: false })
      })
    },
    fetchPRStats: async () => {
      set({ isFetching: true })
      axios.get('api/openPrs', {
        params: {
          repoName: get().repoName,
          fromDate: get().fromDate,
          toDate: get().toDate
        }
      }).then(res => {
        set({ repoMetrics: res?.data?.dataMetrices })
        set({ openPRData: res?.data?.openPRData })
        set({ isFetching: false })
      }).catch(() => {
        set({ repoMetrics: [] })
        set({ isFetching: false })
      })
    }
  }
))
