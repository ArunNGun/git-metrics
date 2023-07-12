const USRS_QRY = `query($search: String!) {
  search(query: $search, type: ISSUE, first: 100) {
    edges {
      node {
        ... on PullRequest {
          title
          url
          state
          createdAt
          mergedAt
          closedAt
          totalCommentsCount
        }
      }
    }
  }
}`

export default async function ({
  startDate,
  endDate,
  user,
  octokit
}) {
  let search = `is:pr author:${user} created:${startDate}..${endDate}`
  const prRaised = await octokit.graphql(USRS_QRY, { search })
  search = `is:pr reviewed-by:${user} created:${startDate}..${endDate}`
  const prReviewed = await octokit.graphql(USRS_QRY, { search })
  return { prRaised, prReviewed }
}
