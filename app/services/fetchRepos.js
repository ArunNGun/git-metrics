const REPO_QRY = (org) => `query {
    organization(login: "${org}") {
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
    octokit, org = 'adobe'
}) {
    const data = await octokit.graphql(REPO_QRY(org))
    return data
}
