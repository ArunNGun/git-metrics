export const processUsers = (userData) => {
  const userArray = userData.map(el => {
    return {
      id: el.login,
      label: el.login
    }
  })
  const sortedUserArray = userArray.sort((a, b) => a.label.localeCompare(b.label))
  return sortedUserArray
}

const formatPRData = (prs, role) => {
  const reviewedPRData = []
  let totalReviewedPRsLife = 0
  let totalReviewedAndMergedPRs = 0
  prs?.search?.edges?.forEach(pr => {
    const { node } = pr
    let prLife = 'NA'
    let { mergedAt, createdAt, closedAt } = node
    mergedAt = node.state === 'MERGED' ? mergedAt : new Date()
    mergedAt = node.state === 'CLOSED' ? closedAt : mergedAt

    const mergeDate = new Date(mergedAt) || new Date()
    const createdDate = new Date(createdAt)
    // in days
    prLife = Math.ceil((mergeDate.getTime() - createdDate.getTime()) / 86400000)
    totalReviewedPRsLife += prLife
    totalReviewedAndMergedPRs++

    reviewedPRData.push({
      title: node.title,
      state: node.state,
      prLife,
      comments: node?.totalCommentsCount,
      url: node.url
    })
  })
  if (role === 'reviewed') {
    const avgReviewTime = Math.ceil(totalReviewedPRsLife / totalReviewedAndMergedPRs)
    return { reviewedPRData, avgReviewTime }
  } else {
    return reviewedPRData
  }
}

export const processUserPRs = (prRaised, prReviewed) => {
  const totalRaisedPRs = prRaised?.search?.edges?.length || 0
  const totalReviewedPRS = prReviewed?.search?.edges?.length || 0

  const { reviewedPRData, avgReviewTime } = formatPRData(prReviewed, 'reviewed')
  const raisedPRData = formatPRData(prRaised, 'raised')
  // const reviewedPRData = []
  // let totalReviewedPRsLife = 0
  // let totalReviewedAndMergedPRs = 0
  // prReviewed?.search?.edges?.forEach(pr => {
  //   const { node } = pr
  //   let prLife = 'NA'
  //   let { mergedAt, createdAt } = node
  //   mergedAt = node.state === 'MERGED' ? mergedAt : new Date()
  //   const mergeDate = new Date(mergedAt) || new Date()
  //   const createdDate = new Date(createdAt)
  //   // in days
  //   prLife = Math.ceil((mergeDate.getTime() - createdDate.getTime()) / 86400000)
  //   totalReviewedPRsLife += prLife
  //   totalReviewedAndMergedPRs++

  //   reviewedPRData.push({
  //     title: node.title,
  //     state: node.state,
  //     prLife,
  //     url: node.url
  //   })
  // })
  // const avgReviewTime = Math.ceil(totalReviewedPRsLife / totalReviewedAndMergedPRs)
  return { totalRaisedPRs, totalReviewedPRS, avgReviewTime, reviewedPRData, raisedPRData }
}