//@ts-ignore
import fetchUsers from '../../services/fetchUsers'
import {processUsers} from '../../helpers/usersHelper'
const { Octokit } = require('@octokit/core')

export async function GET(request: Request){
    try {
        const octokit = new Octokit({ auth: process.env.GIT_TOKEN })
        const data = await fetchUsers({ octokit })
        const result = data.organization.membersWithRole.nodes
        const processedUsers = processUsers(result)
        // res.json(processedUsers)
        return new Response(JSON.stringify(processedUsers))
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify([]))
      }
  
  }
 