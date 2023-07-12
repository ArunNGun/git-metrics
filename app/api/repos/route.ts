//@ts-ignore
import fetchRepos from '../../services/fetchRepos'
import {proccessRepo} from '../../helpers/repoHelper'
const { Octokit } = require('@octokit/core')

export async function GET(request: Request){
    try {
        const octokit = new Octokit({ auth: process.env.GIT_TOKEN })
        const data = await fetchRepos({ octokit })
        const result = data.organization.repositories.nodes
        const processedRepos = proccessRepo(result)
        // res.json(processedUsers)
        return new Response(JSON.stringify(processedRepos))
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify([]))
      }
  
  }
 