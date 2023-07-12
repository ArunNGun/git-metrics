const REPO_QRY = `query {
    organization(login: "adobe") {
      repositories(first: 100) {
        nodes {
          name
          pushedAt
        }
      }
    }
  }
  `

export default async function ({
    octokit
}) {
    const data = await octokit.graphql(REPO_QRY)
    return data
}
