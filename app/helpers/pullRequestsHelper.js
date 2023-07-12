export const calculateMergeTime = (pullRequest) => {
  const {
    createdAt,
    closedAt,
    mergedAt,
    state
  } = pullRequest
  if (state !== 'MERGED') return 'NA'
  const startDate = new Date(createdAt)
  let endDate = mergedAt || closedAt
  endDate = new Date(endDate)
  let resultInMinutes = 0
  if (startDate && endDate) {
    const timeDifference = endDate.getTime() - startDate.getTime()
    resultInMinutes = Math.round(timeDifference / 60000)
  }

  return resultInMinutes
}

export const processReviews = (reviews) => {
  const data = {}
  const { nodes } = reviews
  nodes.forEach(review => {
    const { author, comments } = review
    const { login } = author
    let { totalCount } = comments
    totalCount = totalCount || 0
    if (login) {
      if (data[login]) {
        data[login] = data[login] + totalCount
      } else {
        data[login] = totalCount
      }
    }
  })
  return data
}

const getRequestedReviewers = (reviewRequests) => {
  const { nodes } = reviewRequests
  const validNodes = nodes.filter(node => node.requestedReviewer && node.requestedReviewer.login)
  const validReviewers = validNodes.map(node => node.requestedReviewer.login)
  return validReviewers
}

const generateMetricesData = (pullRequests) => {
  const developers = Object.keys(pullRequests)
  const processedData = []
  developers.forEach(developer => {
    const data = {}
    data.developer = developer
    data.raisedPullRequests = pullRequests[developer].raisedPullRequests || []
    data.reviewedPullRequests = pullRequests[developer].reviewedPullRequests || []
    data.prLifes = pullRequests[developer].prLifes || []
    data.commentedPRS = pullRequests[developer].commentedPRS || []
    data.totalReviewedPRS = data.reviewedPullRequests.length
    data.totalCommentedPRS = data.commentedPRS.length
    data.totalSubmittedPRS = data.raisedPullRequests.length
    // calc avg review time
    const sum = data.prLifes?.reduce((acc, val) => acc + val, 0) || 0
    const avg = sum / data.prLifes?.length || 0
    data.averageReviewTime = Math.round(avg)
    processedData.push(data)
  })
  return processedData
}

const generateOpenPRData = (pullRequests) => {
  const formattedData = []

  for (const pr in pullRequests) {
    const obj = {
      id: pr,
      ...pullRequests[pr]
    }
    formattedData.push(obj)
  }
  return formattedData
}

export const processPullRequests = (pullRequests) => {
  const data = {}
  const openPRs = {}
  pullRequests.forEach(prNode => {
    const { node } = prNode
    const { author, id, reviews, reviewRequests } = node
    const { login } = author
    const prLife = calculateMergeTime(node)
    const prReviews = processReviews(reviews)
    const validReviewers = getRequestedReviewers(reviewRequests)

    // prepare data for open pull requests
    if (node.state === 'OPEN') {
      const now = new Date()
      const prCreated = new Date(node.createdAt)
      // in days
      const timeLapsed = (now - prCreated) / (1000 * 60 * 60 * 24)
      const prTitle = node.title
      openPRs[id] = {
        timeLapsed,
        prTitle,
        url: node.url,
        author: login
      }
    }
    // prep data of raised pull requests
    if (data[login] && data[login].raisedPullRequests) {
      data[login].raisedPullRequests.push(id)
    } else if (data[login] && !data[login].raisedPullRequests) {
      data[login].raisedPullRequests = [id]
    } else if (!data[login]) {
      data[login] = {
        raisedPullRequests: [id]
      }
    }

    // prep data of reviewed
    Object.keys(prReviews).forEach(review => {
      if (review) {
        if (data[review] && !data[review].reviewedPullRequests) {
          data[review].reviewedPullRequests = [id]
          if (prLife !== 'NA') {
            data[review].prLifes = [prLife]
          }
          if (!data[review].commentedPRS) {
            data[review].commentedPRS = [id]
          } else if (data[review].commentedPRS && !data[review].commentedPRS.includes(id)) {
            data[review].commentedPRS.push(id)
          }
        } else if (data[review] && data[review].reviewedPullRequests && !data[review].reviewedPullRequests.includes(id)) {
          data[review].reviewedPullRequests.push(id)
          if (prLife !== 'NA') {
            if (data[review].prLifes) {
              data[review].prLifes.push(prLife)
            } else {
              data[review].prLifes = [prLife]
            }
          }

          if (!data[review].commentedPRS) {
            data[review].commentedPRS = [id]
          } else if (data[review].commentedPRS && !data[review].commentedPRS.includes(id)) {
            data[review].commentedPRS.push(id)
          }
        } else if (!data[review]) {
          data[review] = {
            reviewedPullRequests: [id],
            prLifes: prLife !== 'NA' ? [prLife] : [],
            commentedPRS: prReviews[review] ? [id] : []
          }
        }
      }
    })

    // prepare data from requested reviewers
    validReviewers.forEach(review => {
      if (!data[review]) {
        data[review] = {
          reviewedPullRequests: [id]
        }
      } else if (data[review] && !data[review].reviewedPullRequests) {
        data[review].reviewedPullRequests = [id]
      }
    })
  })

  const dataMetrices = generateMetricesData(data)
  const openPRData = generateOpenPRData(openPRs)
  return { openPRData, dataMetrices }
}
