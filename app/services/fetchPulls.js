const PRS_QUERY = `
  query($search: String!, $limit: Int!, $cursor: String) {
    search(query: $search, first: $limit, after: $cursor, type: ISSUE) {
      issueCount
      edges {
        node {
          ... on PullRequest {
            id
            title
            state
            author {
              login
            }
            createdAt
            closedAt
            updatedAt
            mergedAt
            url
            comments(first: 100) {
              totalCount
            }
            commits(first: 100) {
              nodes {
                commit {
                  id
                  author {
                    date
                    name                  
                  }
                }
              }
            }
            reviewRequests(first: 100) {
              nodes {
                requestedReviewer {
                  ... on User {
                    name
                    login
                  }
                }
              }
            }
            reviews(first: 100) {
              totalCount
              nodes {
                author {
                  login
                }
                comments {
                  totalCount
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export default async function ({
  repoName,
  startDate,
  endDate,
  appOctokit
}) {
  // can add end date to here in the query also isMerged flag, should we use updated on isntead of created?

  const search = `repo:${repoName} created:${startDate}..${endDate} type:pr`
  const limit = 60

  let data = []
  let hasNextPage = true
  let cursor
  console.log(`query: ${search}`)
  while (hasNextPage) {
    const response = await appOctokit.graphql(PRS_QUERY, { search, cursor, limit })
    const pulls = response.search
    console.log('response:', response)
    console.log('hasNextPage:', hasNextPage)
    console.log('cursor:', cursor)
    data = data.concat(pulls.edges)
    hasNextPage = pulls.pageInfo.hasNextPage
    cursor = pulls.pageInfo.endCursor
  }

  return { search: { edges: data } }
}
