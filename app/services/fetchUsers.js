const USRS_QRY = (org) => `query {
  organization(login: "${org}") {
    membersWithRole(first: 100) {
      nodes {
        name
        login
      }
    }
  }
}
`

export default async function ({
  octokit, org = 'adobe'
}) {
  return await octokit.graphql(USRS_QRY(org))
}
