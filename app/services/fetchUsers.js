const USRS_QRY = `query {
  organization(login: "adobe") {
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
  octokit
}) {
  return await octokit.graphql(USRS_QRY)
}
