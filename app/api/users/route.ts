//@ts-ignore
import fetchUsers from '../../services/fetchUsers'
import {processUsers} from '../../helpers/usersHelper'
const { Octokit } = require('@octokit/core')

export async function GET(request: Request){
    try {
        const { searchParams } = new URL(request.url)
        const org = searchParams.get('org') || 'adobe'
        const octokit = new Octokit({ auth: process.env.GIT_TOKEN })
        const data = await fetchUsers({ octokit, org })
        const result = data.organization.membersWithRole.nodes
        const processedUsers = processUsers(result)
        return new Response(JSON.stringify(processedUsers))
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify([]))
      }
  
  }
 