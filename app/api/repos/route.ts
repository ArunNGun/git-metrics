//@ts-ignore
import fetchRepos from '../../services/fetchRepos'
import {proccessRepo} from '../../helpers/repoHelper'
const { Octokit } = require('@octokit/core')

export async function GET(request: Request){
    try {
        const { searchParams } = new URL(request.url)
        const org = searchParams.get('org') || 'adobe'
        const octokit = new Octokit({ auth: process.env.GIT_TOKEN })
        const data = await fetchRepos({ octokit, org })
        const result = data.organization.repositories.nodes
        const processedRepos = proccessRepo(result)
        return new Response(JSON.stringify(processedRepos))
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify([]))
      }
  
  }
 